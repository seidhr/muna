import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import React from 'react'
import { Autocomplete, Stack, Text, Card, Box } from '@sanity/ui'

import type { KulturnavAutocompleteItem, SearchFilters } from '../types'
import { searchKulturnav } from '../lib/kulturnavClient'
import type { KulturnavClientConfig } from '../lib/kulturnavClient'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSelect: (item: KulturnavAutocompleteItem) => void
  filters: SearchFilters
  config: KulturnavClientConfig
  placeholder?: string
  disabled?: boolean
}

export function SearchInput({
  value,
  onChange,
  onSelect,
  filters,
  config,
  placeholder = 'Search kulturnav...',
  disabled = false,
}: SearchInputProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [results, setResults] = useState<KulturnavAutocompleteItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const resultsMapRef = useRef<Map<string, KulturnavAutocompleteItem>>(new Map())

  // Debounced search
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    if (!searchQuery || searchQuery.trim().length === 0) {
      setResults([])
      setIsLoading(false)
      resultsMapRef.current.clear()
      return
    }

    setIsLoading(true)
    setError(null)

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const searchResults = await searchKulturnav(searchQuery, filters, config)
        setResults(searchResults)
        // Create a map for quick lookup when option is selected
        resultsMapRef.current.clear()
        searchResults.forEach((item) => {
          resultsMapRef.current.set(item.uuid, item)
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to search')
        setResults([])
        resultsMapRef.current.clear()
      } finally {
        setIsLoading(false)
      }
    }, 400) // 400ms debounce

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchQuery, filters, config])

  // Transform results to Autocomplete options format
  const options = useMemo(
    () =>
      results.map((item) => ({
        value: item.uuid,
      })),
    [results],
  )

  const handleQueryChange = useCallback(
    (query: string | null) => {
      setSearchQuery(query)
      onChange(query || '')
    },
    [onChange],
  )

  const handleSelect = useCallback(
    (selectedValue: string) => {
      const item = resultsMapRef.current.get(selectedValue)
      if (item) {
        onSelect(item)
        // Clear the search query and results immediately
        setSearchQuery('') // Set to empty string to clear input
        setResults([])
        resultsMapRef.current.clear()
        // Clear the onChange callback to reset parent state
        onChange('')
      }
    },
    [onSelect, onChange],
  )

  const renderOption = useCallback((option: { value: string }) => {
    const item = resultsMapRef.current.get(option.value)
    if (!item) {
      return <Box padding={3} />
    }

    return (
      <Box padding={3}>
        <Stack space={1}>
          <Text size={1} weight="medium">
            {item.caption}
          </Text>
          {item.datasetCaption && (
            <Text size={0} muted>
              {item.datasetCaption}
            </Text>
          )}
        </Stack>
      </Box>
    )
  }, [])

  return (
    <Stack space={2}>
      <Autocomplete
        id="kulturnav-search"
        options={options}
        onQueryChange={handleQueryChange}
        onSelect={handleSelect}
        renderOption={renderOption}
        renderValue={() => searchQuery || ''} // Always render the query string, never the UUID
        loading={isLoading}
        placeholder={placeholder}
        disabled={disabled}
        filterOption={() => true} // We handle filtering via API, so always show all options
      />

      {error && (
        <Card padding={2} radius={2} tone="critical" marginTop={1}>
          <Text size={1}>{error}</Text>
        </Card>
      )}
    </Stack>
  )
}
