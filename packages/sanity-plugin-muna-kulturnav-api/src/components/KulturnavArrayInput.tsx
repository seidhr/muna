import { useCallback, useMemo } from 'react'
import React from 'react'
import { ArrayInputProps, insert, setIfMissing, unset } from 'sanity'

import type { KulturnavAutocompleteItem, KulturnavReference } from '../types'
import { transformKulturnavResponse } from '../lib/kulturnavClient'
import { getClientConfig } from '../lib/config'
import { SearchInput } from './SearchInput'
import { SelectedBadges } from './SelectedBadges'

interface KulturnavArrayInputProps extends ArrayInputProps {
  // Field options from schema
  options?: {
    entityType?: string
    dataset?: string
    lang?: string
    propertyType?: string
  }
}

/**
 * Array input component for kulturnav references
 * Handles multiple references in an array
 *
 * @public
 */
export function KulturnavArrayInput(props: KulturnavArrayInputProps): React.JSX.Element {
  const { value, onChange, schemaType } = props

  // Get client config for API calls
  const config = useMemo(() => getClientConfig(), [])

  // Get field options from the array field's options
  const fieldOptions = schemaType.options as KulturnavArrayInputProps['options'] | undefined
  const filters = useMemo(
    () => ({
      entityType: fieldOptions?.entityType || props.options?.entityType,
      dataset: fieldOptions?.dataset || props.options?.dataset,
      lang: fieldOptions?.lang || props.options?.lang,
      propertyType: fieldOptions?.propertyType || props.options?.propertyType || 'compoundName',
    }),
    [fieldOptions, props.options],
  )

  // Current value is an array of reference objects (or undefined)
  // Sanity arrays can be undefined initially
  const currentValues: KulturnavReference[] = Array.isArray(value) ? value : []

  const handleSelect = useCallback(
    (item: KulturnavAutocompleteItem) => {
      const reference: KulturnavReference = {
        ...transformKulturnavResponse(item, filters.entityType, config.apiBaseUrl),
        _type: 'kulturnavReference',
        _key: `kulturnav-${item.uuid}-${Date.now()}`, // Generate unique key
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
    [onChange, filters.entityType, config.apiBaseUrl, currentValues],
  )

  const handleRemove = useCallback(
    (index: number) => {
      onChange([unset([index])])
    },
    [onChange],
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
      {currentValues.length > 0 && (
        <SelectedBadges items={currentValues} onRemove={handleRemove} />
      )}
    </div>
  )
}

