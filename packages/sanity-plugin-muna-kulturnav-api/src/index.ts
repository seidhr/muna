import { definePlugin } from 'sanity'

import { KulturnavInput } from './components/KulturnavInput'
import { KulturnavArrayInput } from './components/KulturnavArrayInput'
import { setPluginConfig } from './lib/config'
import { kulturnavReference } from './schemas/KulturnavReference'
import type { KulturnavPluginConfig } from './types'

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {kulturnavInput} from '@seidhr/sanity-plugin-muna-kulturnav-api'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [kulturnavInput({
 *     apiBaseUrl: 'https://kulturnav.org',
 *     apiVersion: 'v1.5',
 *     defaultLanguage: 'no',
 *   })],
 *   schema: {
 *     types: [
 *       defineType({
 *         name: 'Artwork',
 *         type: 'document',
 *         fields: [
 *           defineField({
 *             name: 'creator',
 *             type: 'kulturnavReference',
 *             title: 'Creator',
 *             options: {
 *               entityType: 'Person',
 *             },
 *           }),
 *         ],
 *       }),
 *     ],
 *   },
 * })
 * ```
 *
 * @public
 */
export const kulturnavInput = definePlugin<KulturnavPluginConfig | void>((config = {}) => {
  // Store config for components to access
  setPluginConfig(config)

  return {
    name: '@seidhr/sanity-plugin-muna-kulturnav-api',
    schema: {
      types: [kulturnavReference],
    },
    form: {
      components: {
        input: (props) => {
          // Check if this is an array input
          if (props.schemaType.jsonType === 'array') {
            // Check if the array contains kulturnavReference
            const ofTypes = props.schemaType.of || []
            const hasKulturnavReference = ofTypes.some(
              (type: any) => type.name === 'kulturnavReference',
            )
            if (hasKulturnavReference) {
              return KulturnavArrayInput(props as any)
            }
          }
          // For object inputs, use the default or custom object input
          if (props.schemaType.name === 'kulturnavReference') {
            return KulturnavInput(props as any)
          }
          // Use default input for other types
          return props.renderDefault(props)
        },
      },
    },
  }
})

/**
 * Backward compatibility alias for kulturnavInput
 *
 * @public
 */
export const APISearchInput = kulturnavInput

export { kulturnavReference }
export { KulturnavInput }
export { KulturnavArrayInput }
export { PreviewAvatar } from './components/PreviewAvatar'
export { PreviewBadge } from './components/PreviewBadge'
export { DetailsPopup } from './components/DetailsPopup'
export type { KulturnavPluginConfig, PreviewStyle, PreviewComponentProps } from './types'
export type { KulturnavReference } from './types'
