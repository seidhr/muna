import { useCallback } from 'react'
import React from 'react'
import { insert, setIfMissing, unset, ArraySchemaType } from 'sanity'
import { Stack, Card, Text, Flex, Box, Button } from '@sanity/ui'

import type { ExternalReference, Loader, LoaderResult } from '../types'
import { SearchInput } from './SearchInput'

interface ExternalReferenceArrayInputProps {
  value?: ExternalReference[]
  onChange: (patches: any[]) => void
  schemaType: ArraySchemaType
  renderDefault: (props: any) => React.ReactElement
  renderItem?: (props: any) => React.ReactElement
  renderPreview?: (props: any) => React.ReactElement
  loader: Loader
  autocompleteProps?: {
    placeholder?: string
    [key: string]: any
  }
}

// Type for array items with _key (required by Sanity arrays)
type ExternalReferenceWithKey = ExternalReference & {
  _key: string
}

/**
 * Array input component for external references
 * Handles multiple references in an array
 *
 * @public
 */
export function ExternalReferenceArrayInput(
  props: ExternalReferenceArrayInputProps,
): React.JSX.Element {
  const { value, onChange, loader, autocompleteProps, schemaType } = props

  // Get the item type name from the array's 'of' types
  const itemTypeName = schemaType.of?.[0]?.name || 'ExternalReference'

  // Current value is an array of reference objects (or undefined)
  // Sanity arrays can be undefined initially
  const currentValues: ExternalReferenceWithKey[] = Array.isArray(value)
    ? (value as ExternalReferenceWithKey[])
    : []

  const handleSelect = useCallback(
    (result: LoaderResult) => {
      // Transform LoaderResult to ExternalReference (drop value field)
      // Use the item type name for _type to match the schema definition
      const reference: ExternalReferenceWithKey = {
        _key: Date.now().toString(36) + Math.random().toString(36).substring(2, 9), // Short unique key for ordering
        _type: itemTypeName,
        id: result.id,
        type: result.type,
        label: result.label,
        notation: result.notation,
        complete: result.complete,
      }

      // Check if this item is already in the array (by id)
      const exists = currentValues.some((v) => v.id === reference.id)
      if (exists) {
        return // Don't add duplicates
      }

      // Insert the new reference at the end of the array
      const patches = [setIfMissing([]), insert([reference], 'after', [-1])]
      onChange(patches)
    },
    [onChange, currentValues, itemTypeName],
  )

  const handleRemove = useCallback(
    (index: number) => {
      onChange([unset([index])])
    },
    [onChange],
  )

  return (
    <Stack space={3}>
      <SearchInput
        loader={loader}
        onSelect={handleSelect}
        autocompleteProps={autocompleteProps}
      />
      <Stack space={2}>
        {currentValues.map((item, index) => (
          <Card key={item._key || item.id} padding={2} radius={2} tone="default">
            <Flex align="center" justify="space-between" gap={2}>
              <Box flex={1}>
                <Stack space={1}>
                  <Text size={1} weight="medium">
                    {item.label || item.id}
                  </Text>
                  {item.type && (
                    <Text size={0} muted>
                      {item.type}
                    </Text>
                  )}
                  {item.id && (
                    <Text size={0} muted style={{ wordBreak: 'break-all' }}>
                      {item.id}
                    </Text>
                  )}
                </Stack>
              </Box>
              <Button
                mode="ghost"
                tone="critical"
                text="Remove"
                onClick={() => handleRemove(index)}
              />
            </Flex>
          </Card>
        ))}
      </Stack>
    </Stack>
  )
}

