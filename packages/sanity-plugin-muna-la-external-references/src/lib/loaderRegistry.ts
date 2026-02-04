import type { ExternalReferencePluginConfig, Loader } from '../types'

// Global registry to store loaders and autocompleteProps per schemaType
// This is shared across all plugin instances
const loaderRegistry = new Map<
  string,
  { loader: Loader; autocompleteProps?: ExternalReferencePluginConfig['autocompleteProps'] }
>()

/**
 * Register a loader for a schema type
 * @internal
 */
export function registerLoader(
  schemaType: string,
  loader: Loader,
  autocompleteProps?: ExternalReferencePluginConfig['autocompleteProps'],
): void {
  loaderRegistry.set(schemaType, { loader, autocompleteProps })
}

/**
 * Get loader and autocompleteProps for a schema type
 * @internal
 */
export function getLoaderForSchemaType(schemaTypeName: string) {
  return loaderRegistry.get(schemaTypeName)
}

/**
 * Get all registered schema types
 * @internal
 */
export function getRegisteredSchemaTypes(): string[] {
  return Array.from(loaderRegistry.keys())
}

