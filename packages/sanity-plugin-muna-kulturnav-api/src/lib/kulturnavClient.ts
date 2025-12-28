import type {
  KulturnavAutocompleteItem,
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

