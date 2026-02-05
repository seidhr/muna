import { useCallback, useMemo } from 'react'
import React from 'react'
import { insert, setIfMissing, unset, ArraySchemaType } from 'sanity'
import { Stack } from '@sanity/ui'

import type { KulturnavReference, LoaderResult } from '../types'
import { createKulturnavLoader } from '../lib/kulturnavClient'
import { SearchInput } from './SearchInput'
import { SelectedBadges } from './SelectedBadges'

interface KulturnavArrayInputProps {
  value?: KulturnavReference[]
  onChange: (patches: any[]) => void
  schemaType: ArraySchemaType
  // Field options from schema
  options?: {
    entityType?: string
    dataset?: string
    lang?: string
    propertyType?: string
  }
}

// Type for array items with _key (required by Sanity arrays)
type KulturnavReferenceWithKey = KulturnavReference & {
  _key: string
}

/**
 * Array input component for kulturnav references
 * Handles multiple references in an array
 *
 * @public
 */
export function KulturnavArrayInput(props: KulturnavArrayInputProps): React.JSX.Element {
  const { value, onChange, schemaType } = props

  // Get field options from the array field's options
  const fieldOptions = schemaType.options as KulturnavArrayInputProps['options'] | undefined
  const entityType = fieldOptions?.entityType || props.options?.entityType
  const dataset = fieldOptions?.dataset || props.options?.dataset

  // Create loader with appropriate options
  const loader = useMemo(() => {
    return createKulturnavLoader({
      entityTypes: entityType ? [entityType] : undefined,
      datasetUuids: dataset ? [dataset] : undefined,
    })
  }, [entityType, dataset])

  // Current value is an array of reference objects (or undefined)
  // Sanity arrays can be undefined initially
  const currentValues: KulturnavReferenceWithKey[] = Array.isArray(value) ? (value as KulturnavReferenceWithKey[]) : []

  const handleSelect = useCallback(
    (result: LoaderResult) => {
      const reference: KulturnavReferenceWithKey = {
        _key: Date.now().toString(36) + Math.random().toString(36).substring(2, 9), // Short unique key for ordering
        _type: 'ExternalReference',
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
    [onChange, currentValues],
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
        autocompleteProps={{
          placeholder: 'Search kulturnav...',
        }}
      />
      {currentValues.length > 0 && (
        <SelectedBadges items={currentValues} onRemove={handleRemove} />
      )}
    </Stack>
  )
}

