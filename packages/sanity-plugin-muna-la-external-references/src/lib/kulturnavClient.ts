import type {
  KulturnavAutocompleteItem,
  KulturnavDetails,
  KulturnavReference,
  SearchFilters,
  Loader,
  LoaderResult,
  KulturnavLoaderOptions,
} from '../types'

export interface KulturnavClientConfig {
  apiBaseUrl: string
  apiVersion: string
  defaultEntityType?: string
  defaultDataset?: string
  defaultLanguage?: string
  searchEndpoint?: 'autocomplete' | 'search' | 'core' | 'summary'
  customSearchUrl?: (query: string, filters: SearchFilters) => string
}

/**
 * Transform kulturnav autocomplete response to Linked Art reference
 */
export function transformKulturnavResponse(
  item: KulturnavAutocompleteItem,
  entityType?: string,
  apiBaseUrl: string = 'https://kulturnav.org',
): KulturnavReference {
  return {
    _type: 'ExternalReference',
    id: `${apiBaseUrl}/${item.uuid}`,
    type: entityType || 'Concept', // Default to Concept if not provided
    label: item.caption,
  }
}

/**
 * Build kulturnav search URL using summary endpoint with custom search string format
 */
export function buildAutocompleteUrl(
  query: string,
  filters: SearchFilters,
  config: KulturnavClientConfig,
): string {
  if (config.customSearchUrl) {
    return config.customSearchUrl(query, filters)
  }

  const baseUrl = config.apiBaseUrl.replace(/\/$/, '')
  // Use summary endpoint which supports custom search string format
  // Note: summary endpoint doesn't use version in path, format is: /api/summary/searchString

  // Use filters or defaults from config
  const entityType = filters.entityType || config.defaultEntityType || 'Concept'
  const propertyType = filters.propertyType || 'compoundName'

  // Build custom search string in format: field:value,field:value
  // Example: actualEntityType:Concept,concept.isCollection:false,compoundName:fisk*
  const searchParts: string[] = []

  // Add entity type filter
  searchParts.push(`actualEntityType:${entityType}`)

  // Add concept collection filter (exclude collections and guide terms)
  if (entityType === 'Concept') {
    searchParts.push('concept.isCollection:false')
  }

  // Add search query with wildcard
  // propertyType is typically 'compoundName' for name searches
  const searchQuery = query.trim()
  if (searchQuery) {
    searchParts.push(`${propertyType}:${searchQuery}*`)
  }

  // Build URL: /api/summary/searchString
  const searchString = searchParts.join(',')
  return `${baseUrl}/api/summary/${searchString}`
}

/**
 * Extract text value from language-keyed object or string
 */
function extractTextValue(value: any, lang: string): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object') {
    return value[lang] || value.no || value.en || (Object.values(value)[0] as string) || ''
  }
  return ''
}

/**
 * Search kulturnav API using summary endpoint
 */
export async function searchKulturnav(
  query: string,
  filters: SearchFilters,
  config: KulturnavClientConfig,
): Promise<KulturnavAutocompleteItem[]> {
  if (!query || query.trim().length === 0) {
    return []
  }

  const url = buildAutocompleteUrl(query, filters, config)

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Summary endpoint returns a direct array of entities
    if (Array.isArray(data)) {
      // Map summary response to KulturnavAutocompleteItem format
      const lang = filters.lang || config.defaultLanguage || 'no'

      return data.map((item: any): KulturnavAutocompleteItem => {
        // Extract caption from name or caption object (can be language-keyed object or string)
        const caption = extractTextValue(item.caption, lang) || extractTextValue(item.name, lang)

        return {
          uuid: item.uuid,
          caption: caption || '',
          datasetUuid: item.dataset?.uuid,
          datasetCaption: extractTextValue(item.dataset?.displayValue, lang),
        }
      })
    }

    return []
  } catch (error) {
    console.error('Kulturnav API error:', error)
    throw error
  }
}

/**
 * Memoized cache for API responses
 */
const detailsCache = new Map<string, { data: KulturnavDetails; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * Fetch full details for a kulturnav entity
 * Fetches from /api/{uuid} which returns JSON-LD format
 * Results are memoized with a TTL
 */
export async function fetchKulturnavDetails(
  uuid: string,
  config: KulturnavClientConfig,
): Promise<KulturnavDetails> {
  const cacheKey = `${config.apiBaseUrl}/${uuid}`
  const cached = detailsCache.get(cacheKey)

  // Return cached data if still valid
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }

  const baseUrl = config.apiBaseUrl.replace(/\/$/, '')
  // Use /{uuid}.json-ld endpoint (e.g., https://kulturnav.org/{uuid}.json-ld)
  const url = `${baseUrl}/${uuid}.json-ld`

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/ld+json, application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // JSON-LD format has @graph array with entities
    // The main entity is typically the first one in @graph
    let entityData: KulturnavDetails | null = null

    if (data['@graph'] && Array.isArray(data['@graph']) && data['@graph'].length > 0) {
      // Find the main entity (usually the first one, or one with @id matching the UUID)
      const mainEntityId = `${baseUrl}/${uuid}`
      entityData =
        data['@graph'].find((item: any) => item['@id'] === mainEntityId) || data['@graph'][0]
    } else if (data['@id']) {
      // If it's already a single entity object
      entityData = data
    }

    if (!entityData) {
      throw new Error('No entity data found in response')
    }

    // Extract caption from entity.fullCaption or name or title
    let caption = ''
    if (entityData['entity.fullCaption']) {
      // Can be { "@language": "sv", "@value": "..." } or string
      if (
        typeof entityData['entity.fullCaption'] === 'object' &&
        entityData['entity.fullCaption']['@value']
      ) {
        caption = entityData['entity.fullCaption']['@value']
      } else if (typeof entityData['entity.fullCaption'] === 'string') {
        caption = entityData['entity.fullCaption']
      }
    } else if (entityData.name) {
      // Can be { "@language": "sv", "@value": "..." } or string
      if (typeof entityData.name === 'object' && entityData.name['@value']) {
        caption = entityData.name['@value']
      } else if (typeof entityData.name === 'string') {
        caption = entityData.name
      }
    } else if (entityData.title) {
      if (typeof entityData.title === 'object' && entityData.title['@value']) {
        caption = entityData.title['@value']
      } else if (typeof entityData.title === 'string') {
        caption = entityData.title
      }
    }

    // Extract UUID from @id if not present
    if (!entityData.uuid) {
      const idMatch = entityData['@id']?.match(/\/([a-f0-9-]+)$/i)
      if (idMatch) {
        entityData.uuid = idMatch[1]
      } else {
        entityData.uuid = uuid
      }
    }

    // Create a normalized details object
    const normalizedDetails: KulturnavDetails = {
      ...entityData, // Include all original data first
      uuid: entityData.uuid || uuid, // Ensure UUID is set
      caption: caption || entityData.caption || '', // Use extracted caption or fallback
    }

    // Cache the result
    detailsCache.set(cacheKey, { data: normalizedDetails, timestamp: Date.now() })

    return normalizedDetails
  } catch (error) {
    console.error('Kulturnav details API error:', error)
    throw error
  }
}

/**
 * Extract UUID from kulturnav reference ID
 */
export function extractUuidFromId(id: string): string | null {
  // ID format: https://kulturnav.org/{uuid}
  const match = id.match(/\/([a-f0-9-]+)$/i)
  return match ? match[1] : null
}

/**
 * Create a kulturnav loader function
 * @public
 */
export function createKulturnavLoader(
  options: KulturnavLoaderOptions = {},
): Loader {
  // Hardcoded API settings
  const apiBaseUrl = 'https://kulturnav.org'
  const apiVersion = 'v1.5'
  const defaultLanguage = 'no'
  const searchEndpoint: 'summary' = 'summary'

  const config: KulturnavClientConfig = {
    apiBaseUrl,
    apiVersion,
    defaultLanguage,
    searchEndpoint,
  }

  return async (query: string): Promise<LoaderResult[]> => {
    if (!query || query.trim().length === 0) {
      return []
    }

    // Build filters from options
    const filters: SearchFilters = {
      propertyType: 'compoundName',
    }

    // Apply entityTypes filter - if multiple, we'll need to handle OR logic
    // For now, if multiple entityTypes, we'll search each separately and combine
    const entityTypes = options.entityTypes || []
    const datasetUuids = options.datasetUuids || []

    // Store results with their entity types
    type ResultWithType = KulturnavAutocompleteItem & { entityType: string }
    let allResults: ResultWithType[] = []

    console.debug('[kulturnav] search', { query, entityTypes, datasetUuids, filters, config })

    if (entityTypes.length > 0) {
      // Search for each entity type separately and track which type each result came from
      for (const entityType of entityTypes) {
        const typeFilters: SearchFilters = {
          ...filters,
          entityType,
        }

        try {
          const results = await searchKulturnav(query, typeFilters, config)
          // Tag each result with its entity type
          const typedResults: ResultWithType[] = results.map((item) => ({
            ...item,
            entityType,
          }))
          allResults = [...allResults, ...typedResults]
        } catch (error) {
          console.error(`Error searching for entity type ${entityType}:`, error)
        }
      }
    } else {
      // No entity type filter - search all (default to Concept)
      try {
        const results = await searchKulturnav(query, filters, config)
        // Tag with default entity type
        allResults = results.map((item) => ({
          ...item,
          entityType: 'Concept',
        }))
      } catch (error) {
        console.error('Error searching kulturnav:', error)
        throw error
      }
    }

    // Filter by datasetUuids if provided
    if (datasetUuids.length > 0) {
      allResults = allResults.filter(
        (item) => item.datasetUuid && datasetUuids.includes(item.datasetUuid),
      )
    }

    // Remove duplicates (by UUID), keeping the first occurrence
    const uniqueResults = Array.from(
      new Map(allResults.map((item) => [item.uuid, item])).values(),
    )

    // Transform to LoaderResult format
    return uniqueResults.map((item): LoaderResult => {
      return {
        value: item.caption, // For autocomplete display
        id: `${apiBaseUrl}/${item.uuid}`, // Dereferenceable URI
        type: item.entityType, // Entity type from the search
        label: item.caption, // Human-readable label
        // notation and complete are optional and not available from autocomplete
      }
    })
  }
}
