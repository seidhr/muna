import type React from 'react'

/**
 * Linked Art reference model structure
 * @see https://linked.art/api/1.0/shared/reference/
 *
 * @public
 */
export interface KulturnavReference {
  _type: 'ExternalReference'
  id: string // Required: dereferenceable URI
  type: string // Required: entity type (e.g., "Person", "Concept", "Place")
  label?: string // Recommended: human-readable label (maps to _label in Linked Art)
  notation?: string[] // Optional: additional identifiers (e.g., language tags)
  complete?: boolean // Optional: if true, stores full embedded data (maps to _complete in Linked Art)
}

/**
 * Kulturnav API autocomplete response item
 */
export interface KulturnavAutocompleteItem {
  uuid: string
  caption: string
  datasetUuid?: string
  datasetCaption?: string
}

/**
 * Full details from kulturnav API
 */
export interface KulturnavDetails {
  uuid: string
  caption: string
  description?: string
  datasetUuid?: string
  datasetCaption?: string
  [key: string]: any // Allow additional properties
}

/**
 * Preview style options
 *
 * @public
 */
export type PreviewStyle = 'avatar' | 'badge' | 'custom'

/**
 * Preview component props
 *
 * @public
 */
export interface PreviewComponentProps {
  item: KulturnavReference
  onRemove: () => void
  onShowDetails: () => void
  details?: KulturnavDetails | null
  isLoadingDetails?: boolean
}

/**
 * Search filters for kulturnav API
 */
export interface SearchFilters {
  entityType?: string
  dataset?: string
  lang?: string
  propertyType?: string
}

/**
 * Plugin configuration options
 *
 * @public
 */
export interface KulturnavPluginConfig {
  apiBaseUrl?: string // Default: 'https://kulturnav.org'
  apiVersion?: string // Default: 'v1.5'
  defaultEntityType?: string
  defaultDataset?: string
  defaultLanguage?: string
  storageMode?: 'reference' | 'embed' // Default: 'reference'
  searchEndpoint?: 'autocomplete' | 'search' | 'core' // Default: 'autocomplete'
  transformResponse?: (data: KulturnavAutocompleteItem) => KulturnavReference
  // Generic API support
  customSearchUrl?: (query: string, filters: SearchFilters) => string
  customTransformResponse?: (data: any) => any
  // Preview configuration
  previewComponent?: (props: PreviewComponentProps) => React.ReactElement
  defaultPreviewStyle?: PreviewStyle | ((item: KulturnavReference) => PreviewStyle)
}

/**
 * Field-level options (can be set per field)
 */
export interface KulturnavFieldOptions {
  entityType?: string
  dataset?: string
  lang?: string
  propertyType?: string
  previewStyle?: PreviewStyle | ((item: KulturnavReference) => PreviewStyle)
  previewComponent?: (props: PreviewComponentProps) => React.ReactElement
}
