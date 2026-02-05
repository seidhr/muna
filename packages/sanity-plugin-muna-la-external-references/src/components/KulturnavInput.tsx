import { useCallback, useMemo } from 'react'
import React from 'react'
import { ObjectInputProps, set, unset } from 'sanity'
import { Stack } from '@sanity/ui'

import type { KulturnavReference, LoaderResult } from '../types'
import { createKulturnavLoader } from '../lib/kulturnavClient'
import { SearchInput } from './SearchInput'
import { SelectedBadges } from './SelectedBadges'

interface KulturnavInputProps extends ObjectInputProps {
  // Field options from schema
  options?: {
    entityType?: string
    dataset?: string
    lang?: string
    propertyType?: string
  }
}

/**
 * Main input component for kulturnav references
 * Works for single object fields. For array fields, Sanity wraps each item.
 *
 * @public
 */
export function KulturnavInput(props: KulturnavInputProps): React.JSX.Element {
  const { value, onChange, schemaType } = props

  // Get field options
  const fieldOptions = schemaType.options as KulturnavInputProps['options'] | undefined
  const entityType = fieldOptions?.entityType || props.options?.entityType
  const dataset = fieldOptions?.dataset || props.options?.dataset

  // Create loader with appropriate options
  const loader = useMemo(() => {
    return createKulturnavLoader({
      entityTypes: entityType ? [entityType] : undefined,
      datasetUuids: dataset ? [dataset] : undefined,
    })
  }, [entityType, dataset])

  // Current value is a single reference object (or null)
  const currentValue: KulturnavReference | null = value as KulturnavReference | null

  const handleSelect = useCallback(
    (result: LoaderResult) => {
      const reference: KulturnavReference = {
        _type: 'ExternalReference',
        id: result.id,
        type: result.type,
        label: result.label,
        notation: result.notation,
        complete: result.complete,
      }
      onChange([set(reference)])
    },
    [onChange],
  )

  const handleRemove = useCallback(() => {
    onChange([unset()])
  }, [onChange])

  return (
    <Stack space={3}>
      <SearchInput
        loader={loader}
        onSelect={handleSelect}
        autocompleteProps={{
          placeholder: 'Search kulturnav...',
        }}
      />
      {currentValue && (
        <SelectedBadges items={[currentValue]} onRemove={() => handleRemove()} />
      )}
    </Stack>
  )
}

