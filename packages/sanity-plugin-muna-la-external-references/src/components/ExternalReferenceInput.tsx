import { useCallback, useMemo } from 'react'
import React from 'react'
import { ObjectInputProps, set, unset } from 'sanity'
import { Stack, Card, Text, Flex, Box, Button } from '@sanity/ui'

import type {
  ExternalReference,
  Loader,
  LoaderResult,
  ExternalReferenceFieldOptions,
} from '../types'
import { SearchInput } from './SearchInput'
import { getLoaderForSchemaType } from '../lib/loaderRegistry'
import { createKulturnavLoader } from '../lib/kulturnavClient'

// Stable no-op loader for fallback
const noOpLoader: Loader = async () => []

interface ExternalReferenceInputProps extends ObjectInputProps {
  loader?: Loader
  autocompleteProps?: {
    placeholder?: string
    [key: string]: any
  }
}

/**
 * Main input component for external references
 * Works for single object fields. For array fields, Sanity wraps each item.
 *
 * @public
 */
export function ExternalReferenceInput(
  props: ExternalReferenceInputProps,
): React.JSX.Element {
  const { value, onChange, loader: propLoader, autocompleteProps: propAutocompleteProps, schemaType } = props

  // Get field-level options from schemaType.options
  const fieldOptions = useMemo(
    () => (schemaType.options as ExternalReferenceFieldOptions | undefined) || {},
    [schemaType.options]
  )

  // Determine which loader to use (priority: prop > field options > registry default)
  const loader = useMemo(() => {
    if (propLoader) {
      return propLoader
    }
    if (fieldOptions.loader) {
      return fieldOptions.loader
    }
    // If fieldOptions has loaderOptions, create a kulturnav loader with those options
    if (fieldOptions.loaderOptions) {
      return createKulturnavLoader(fieldOptions.loaderOptions)
    }
    // Fall back to registry default
    const registryEntry = getLoaderForSchemaType(schemaType.name)
    if (registryEntry) {
      return registryEntry.loader
    }
    // No loader found - this shouldn't happen if plugin is configured correctly
    // Return a no-op loader that returns empty results to prevent crashes
    console.warn(
      `No loader found for schema type "${schemaType.name}". Please configure the plugin or provide field-level options.`
    )
    return noOpLoader
  }, [propLoader, fieldOptions, schemaType.name])

  // Merge autocomplete props (priority: prop > field options > registry default)
  const autocompleteProps = useMemo(() => {
    const registryEntry = getLoaderForSchemaType(schemaType.name)
    return {
      ...registryEntry?.autocompleteProps,
      ...fieldOptions.autocompleteProps,
      ...propAutocompleteProps,
    }
  }, [propAutocompleteProps, fieldOptions.autocompleteProps, schemaType.name])

  // Current value is a single reference object (or null)
  const currentValue: ExternalReference | null = value as ExternalReference | null
  const hasData = !!(currentValue && currentValue.id)

  // Check if we're in an array context by examining the path
  // Array items have numeric indices or object keys in their path
  const pathArray = Array.isArray(props.path) ? props.path : []
  const isInArray = pathArray.some(
    (segment) =>
      typeof segment === 'number' ||
      (typeof segment === 'object' && segment !== null && '_key' in segment)
  )

  // Check if current value has _key (for array items)
  const currentValueWithKey = currentValue as ExternalReference & { _key?: string }
  const hasKey = !!(currentValueWithKey && '_key' in currentValueWithKey && currentValueWithKey._key)

  const handleSelect = useCallback(
    (result: LoaderResult) => {
      // Transform LoaderResult to ExternalReference (drop value field)
      // Use the schema type name for _type to match the schema definition
      const reference: any = {
        _type: schemaType.name,
        id: result.id,
        type: result.type,
        label: result.label,
        notation: result.notation,
        complete: result.complete,
      }

      // If we're in an array context and the current value doesn't have a _key,
      // add one when creating a new reference
      if (isInArray && !hasKey) {
        reference._key =
          Date.now().toString(36) + Math.random().toString(36).substring(2, 9)
      }

      onChange([set(reference)])
    },
    [onChange, schemaType.name, isInArray, hasKey],
  )

  const handleRemove = useCallback(() => {
    onChange([unset()])
  }, [onChange])

  // If there's no meaningful data (eg. new item in the modal), show only the search input.
  if (!hasData) {
    return (
      <SearchInput
        loader={loader}
        onSelect={handleSelect}
        autocompleteProps={autocompleteProps}
      />
    )
  }

  // When there's a value, show a display + allow changing/removing via search/remove
  return (
    <Stack space={3}>
      <Card padding={3} radius={2} tone="default">
        <Flex align="center" justify="space-between" gap={2}>
          <Box flex={1}>
            <Stack space={2}>
              <Text size={1} weight="medium">
                {currentValue.label || currentValue.id}
              </Text>
              {currentValue.type && (
                <Text size={0} muted>
                  Type: {currentValue.type}
                </Text>
              )}
              {currentValue.id && (
                <Text size={0} muted style={{ wordBreak: 'break-all' }}>
                  {currentValue.id}
                </Text>
              )}
            </Stack>
          </Box>
          <Button
            mode="ghost"
            tone="critical"
            text="Remove"
            onClick={handleRemove}
          />
        </Flex>
        <SearchInput
          loader={loader}
          onSelect={handleSelect}
          autocompleteProps={autocompleteProps}
        />
      </Card>
    </Stack>
  )
}

