import type {
  KulturnavAutocompleteItem,
  KulturnavDetails,
  KulturnavReference,
  SearchFilters,
} from '../types'

export interface KulturnavClientConfig {
  apiBaseUrl: string
  apiVersion: string
  defaultEntityType?: string
  defaultDataset?: string
  defaultLanguage?: string
  searchEndpoint?: 'autocomplete' | 'search' | 'core'
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
 * Build kulturnav autocomplete URL
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
  const version = config.apiVersion || 'v1.5'
  const endpoint = config.searchEndpoint || 'autocomplete'

  const params = new URLSearchParams()
  params.set('query', query)

  // Use filters or defaults from config
  const entityType = filters.entityType || config.defaultEntityType
  const dataset = filters.dataset || config.defaultDataset
  const lang = filters.lang || config.defaultLanguage
  const propertyType = filters.propertyType || 'compoundName'

  if (entityType) {
    params.set('entityType', entityType)
  }
  if (propertyType) {
    params.set('propertyType', propertyType)
  }
  if (dataset) {
    params.set('dataset', dataset)
  }
  if (lang) {
    params.set('lang', lang)
  }

  return `${baseUrl}/api/${version}/${endpoint}?${params.toString()}`
}

/**
 * Search kulturnav API
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

    // Kulturnav autocomplete returns { fullMatch: [], startMatch: [] }
    // We combine both arrays and remove duplicates
    if (data.fullMatch || data.startMatch) {
      const fullMatch = data.fullMatch || []
      const startMatch = data.startMatch || []
      const combined = [...fullMatch, ...startMatch]

      // Remove duplicates by uuid
      const seen = new Set<string>()
      return combined.filter((item: KulturnavAutocompleteItem) => {
        if (seen.has(item.uuid)) {
          return false
        }
        seen.add(item.uuid)
        return true
      })
    }

    // If it's already an array, return it
    if (Array.isArray(data)) {
      return data
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
