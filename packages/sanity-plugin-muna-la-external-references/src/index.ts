import { definePlugin } from 'sanity'

import { createExternalReferenceSchema } from './schemas/createExternalReferenceSchema'
import { ExternalReferenceInput } from './components/ExternalReferenceInput'
import { ExternalReferenceArrayInput } from './components/ExternalReferenceArrayInput'
import type { ExternalReferencePluginConfig } from './types'
import { registerLoader, getLoaderForSchemaType } from './lib/loaderRegistry'

// Track registered schema types to avoid duplicates
const registeredSchemaTypes = new Set<string>()

/**
 * External reference input plugin
 * Each instance registers a schema type with its own loader
 *
 * @example
 * ```ts
 * import { externalReferenceInput, createKulturnavLoader } from '@seidhr/sanity-plugin-muna-la-external-references'
 *
 * export default defineConfig({
 *   plugins: [
 *     externalReferenceInput({
 *       schemaType: 'kulturnavReference',
 *       loader: createKulturnavLoader({
 *         entityTypes: ['Person', 'Group'],
 *         datasetUuids: ['some-uuid'],
 *       }),
 *       autocompleteProps: {
 *         placeholder: 'Search kulturnav...',
 *       },
 *     }),
 *   ],
 * })
 * ```
 *
 * @public
 */
export const externalReferenceInput = definePlugin<ExternalReferencePluginConfig>(
  (config) => {
    const { schemaType, loader, autocompleteProps } = config

    // Register loader and autocompleteProps for this schemaType
    registerLoader(schemaType, loader, autocompleteProps)

    // Create schema type if not already registered
    let schemaTypeDefinition
    if (!registeredSchemaTypes.has(schemaType)) {
      schemaTypeDefinition = createExternalReferenceSchema(schemaType)
      registeredSchemaTypes.add(schemaType)
    }

    return {
      name: '@seidhr/sanity-plugin-muna-la-external-references',
      schema: {
        types: schemaTypeDefinition ? [schemaTypeDefinition] : [],
      },
      form: {
        components: {
          // Let Sanity handle arrays and everything else.
          // We only override the object input for our registered schema type(s),
          // which will be used both for standalone fields and for items inside arrays
          // (eg. in the \"Edit ...\" dialog).
          input: (props) => {
            const inputSchemaTypeName = props.schemaType.name

            // Check if this schemaType has a registered loader
            const registryEntry = getLoaderForSchemaType(inputSchemaTypeName)
            
            // Check if this schema type has field-level external reference options
            // (loader, loaderOptions, or autocompleteProps specific to external references)
            const fieldOptions = props.schemaType.options as any
            const hasExternalReferenceOptions = 
              fieldOptions &&
              typeof fieldOptions === 'object' &&
              (fieldOptions.loader || fieldOptions.loaderOptions || fieldOptions.autocompleteProps)

            // Only apply our custom input if:
            // 1. The schema type is registered in the plugin, OR
            // 2. The schema type has field-level external reference options
            // Otherwise, use Sanity's default input
            if (!registryEntry && !hasExternalReferenceOptions) {
              return props.renderDefault(props)
            }

            // Use our custom object input for this schema type
            // The component will handle priority: prop > field options > registry default
            return ExternalReferenceInput({
              ...props,
              loader: registryEntry?.loader,
              autocompleteProps: registryEntry?.autocompleteProps,
            } as any)
          },
        },
      },
    }
  },
)

// Re-export for convenience
export { getLoaderForSchemaType } from './lib/loaderRegistry'

/**
 * @deprecated Use externalReferenceInput instead
 * @public
 */
export const kulturnavInput = externalReferenceInput

/**
 * @deprecated Use externalReferenceInput instead
 * @public
 */
export const APISearchInput = externalReferenceInput

// Export components
export { ExternalReferenceInput } from './components/ExternalReferenceInput'
export { ExternalReferenceArrayInput } from './components/ExternalReferenceArrayInput'

// Export loader factory
export { createKulturnavLoader } from './lib/kulturnavClient'

// Export types
export type {
  Loader,
  LoaderResult,
  ExternalReference,
  ExternalReferencePluginConfig,
  ExternalReferenceFieldOptions,
  KulturnavLoaderOptions,
} from './types'

// Deprecated exports for backward compatibility
export { PreviewAvatar } from './components/PreviewAvatar'
export { PreviewBadge } from './components/PreviewBadge'
export { DetailsPopup } from './components/DetailsPopup'
export type {
  KulturnavPluginConfig,
  PreviewStyle,
  PreviewComponentProps,
} from './types'
export type { KulturnavReference } from './types'
