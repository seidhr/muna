import { useCallback, useMemo } from 'react'
import React from 'react'
import { ObjectInputProps, set, unset } from 'sanity'
import { Stack } from '@sanity/ui'

import type { KulturnavAutocompleteItem, KulturnavReference } from '../types'
import { transformKulturnavResponse } from '../lib/kulturnavClient'
import { getClientConfig } from '../lib/config'
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

  // Get client config for API calls
  const config = useMemo(() => getClientConfig(), [])

  // Get field options
  const fieldOptions = schemaType.options as KulturnavInputProps['options'] | undefined
  const filters = useMemo(
    () => ({
      entityType: fieldOptions?.entityType || props.options?.entityType,
      dataset: fieldOptions?.dataset || props.options?.dataset,
      lang: fieldOptions?.lang || props.options?.lang,
      propertyType: fieldOptions?.propertyType || props.options?.propertyType || 'compoundName',
    }),
    [fieldOptions, props.options],
  )

  // Current value is a single reference object (or null)
  const currentValue: KulturnavReference | null = value as KulturnavReference | null

  const handleSelect = useCallback(
    (item: KulturnavAutocompleteItem) => {
      const reference: KulturnavReference = {
        ...transformKulturnavResponse(item, filters.entityType, config.apiBaseUrl),
        _type: 'kulturnavReference',
      }
      onChange([set(reference)])
    },
    [onChange, filters.entityType, config.apiBaseUrl],
  )

  const handleRemove = useCallback(() => {
    onChange([unset()])
  }, [onChange])

  return (
    <Stack space={3}>
      <SearchInput
        value=""
        onChange={() => {
          // Search is handled internally
        }}
        onSelect={handleSelect}
        filters={filters}
        config={config}
        placeholder="Search kulturnav..."
      />
      {currentValue && (
        <SelectedBadges items={[currentValue]} onRemove={() => handleRemove()} />
      )}
    </Stack>
  )
}

