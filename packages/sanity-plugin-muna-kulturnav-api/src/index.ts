import { definePlugin } from 'sanity'

interface MyPluginConfig {
  /* nothing here yet */
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {APISearchInput} from 'sanity-plugin-muna-kulturnav-api'
*
 * export default defineConfig({
 *   // ...
 *   plugins: [APISearchInput()],
 * })
 * ```
 *
 * @public
 */
export const APISearchInput = definePlugin<MyPluginConfig | void>((config = {}) => {
  // eslint-disable-next-line no-console
  console.log('hello from sanity-plugin-muna-kulturnav-api, Tarje')
  return {
    name: 'sanity-plugin-muna-kulturnav-api',
  }
})
