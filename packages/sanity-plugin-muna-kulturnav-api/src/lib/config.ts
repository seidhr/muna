import type { KulturnavPluginConfig } from '../types'
import type { KulturnavClientConfig } from './kulturnavClient'

// Store plugin config at module level
let pluginConfig: KulturnavClientConfig | null = null

/**
 * Set the plugin configuration
 */
export function setPluginConfig(config: KulturnavPluginConfig | void): void {
  const cfg = config || {}
  pluginConfig = {
    apiBaseUrl: cfg.apiBaseUrl || 'https://kulturnav.org',
    apiVersion: cfg.apiVersion || 'v1.5',
    defaultEntityType: cfg.defaultEntityType,
    defaultDataset: cfg.defaultDataset,
    defaultLanguage: cfg.defaultLanguage,
    searchEndpoint: cfg.searchEndpoint || 'autocomplete',
    customSearchUrl: cfg.customSearchUrl,
  }
}

/**
 * Get the plugin configuration
 */
export function getPluginConfig(): KulturnavClientConfig {
  if (!pluginConfig) {
    // Return defaults if not set
    return {
      apiBaseUrl: 'https://kulturnav.org',
      apiVersion: 'v1.5',
      searchEndpoint: 'autocomplete',
    }
  }
  return pluginConfig
}

