import type React from 'react'

/**
 * Loader result type - what loaders return (includes value for autocomplete display)
 * @public
 */
export type LoaderResult = {
  value: string // For autocomplete display only - NOT stored in document
  id: string // Required: dereferenceable URI
  type: string // Required: entity type (e.g., "Person", "Concept", "Place")
  label: string // Required: human-readable label
  notation?: string[] // Optional: additional identifiers
  complete?: boolean // Optional: full embedded data flag
}

/**
 * Loader function type
 * @public
 */
export type Loader = (query: string, options?: any) => Promise<LoaderResult[]>

/**
 * Linked Art reference model structure (stored document)
 * @see https://linked.art/api/1.0/shared/reference/
 *
 * @public
 */
export interface ExternalReference {
  _type: 'ExternalReference'
  id: string // Required: dereferenceable URI
  type: string // Required: entity type (e.g., "Person", "Concept", "Place")
  label?: string // Recommended: human-readable label (maps to _label in Linked Art)
  notation?: string[] // Optional: additional identifiers (e.g., language tags)
  complete?: boolean // Optional: if true, stores full embedded data (maps to _complete in Linked Art)
}

/**
 * @deprecated Use ExternalReference instead
 * @public
 */
export type KulturnavReference = ExternalReference

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
  item: ExternalReference
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
export interface ExternalReferencePluginConfig {
  schemaType: string
  loader: Loader
  autocompleteProps?: {
    placeholder?: string
    // Other Sanity Autocomplete props can be added here
    [key: string]: any
  }
}

/**
 * Field-level options for external reference inputs
 * These can be specified in the schema field definition to override plugin defaults
 *
 * @example
 * ```ts
 * defineField({
 *   name: 'creator',
 *   type: 'kulturnavReference',
 *   options: {
 *     loaderOptions: { entityTypes: ['Person'] },
 *     autocompleteProps: { placeholder: 'Search for a person...' }
 *   }
 * })
 * ```
 *
 * @public
 */
export interface ExternalReferenceFieldOptions {
  /**
   * Custom loader function to use for this field (overrides plugin default)
   */
  loader?: Loader
  /**
   * Options to pass to createKulturnavLoader (only used if loader is not provided)
   * This allows field-level customization of entityTypes, datasetUuids, etc.
   */
  loaderOptions?: KulturnavLoaderOptions
  /**
   * Autocomplete props specific to this field
   */
  autocompleteProps?: {
    placeholder?: string
    [key: string]: any
  }
}

/**
 * Options for creating a kulturnav loader
 *
 * @public
 */
export interface KulturnavLoaderOptions {
  entityTypes?: string[] // Array of entity types to filter by (e.g., ["Person", "Group", "Concept"])
  datasetUuids?: string[] // Array of dataset UUIDs to filter by
}

/**
 * @deprecated Use ExternalReferencePluginConfig instead
 * @public
 */
export interface KulturnavPluginConfig {
  apiBaseUrl?: string // Default: 'https://kulturnav.org'
  apiVersion?: string // Default: 'v1.5'
  defaultEntityType?: string
  defaultDataset?: string
  defaultLanguage?: string
  storageMode?: 'reference' | 'embed' // Default: 'reference'
  searchEndpoint?: 'autocomplete' | 'search' | 'core' | 'summary' // Default: 'summary'
  transformResponse?: (data: KulturnavAutocompleteItem) => ExternalReference
  // Generic API support
  customSearchUrl?: (query: string, filters: SearchFilters) => string
  customTransformResponse?: (data: any) => any
  // Preview configuration
  previewComponent?: (props: PreviewComponentProps) => React.ReactElement
  defaultPreviewStyle?: PreviewStyle | ((item: ExternalReference) => PreviewStyle)
}

/**
 * @deprecated Field-level options removed - loader is at plugin level
 */
export interface KulturnavFieldOptions {
  entityType?: string
  dataset?: string
  lang?: string
  propertyType?: string
  previewStyle?: PreviewStyle | ((item: ExternalReference) => PreviewStyle)
  previewComponent?: (props: PreviewComponentProps) => React.ReactElement
}
