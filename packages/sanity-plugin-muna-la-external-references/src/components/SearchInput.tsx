import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import React from 'react'
import { Autocomplete, Stack, Text, Card } from '@sanity/ui'

import type { Loader, LoaderResult } from '../types'

interface SearchInputProps {
  loader: Loader
  onSelect: (result: LoaderResult) => void
  autocompleteProps?: {
    placeholder?: string
    [key: string]: any
  }
  disabled?: boolean
}

export function SearchInput({
  loader,
  onSelect,
  autocompleteProps = {},
  disabled = false,
}: SearchInputProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [results, setResults] = useState<LoaderResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const resultsMapRef = useRef<Map<string, LoaderResult>>(new Map())

  // Generate a unique ID for this Autocomplete instance
  const autocompleteId = useMemo(() => `search-input-${Math.random().toString(36).substring(2, 9)}`, [])

  // Debounced search when query changes
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
        const searchResults = await loader(searchQuery)
        setResults(searchResults)
        // Build a map from option key to full LoaderResult for quick lookup
        resultsMapRef.current.clear()
        searchResults.forEach((result) => {
          const key = result.value || result.label || result.id
          if (key) {
            resultsMapRef.current.set(key, result)
          }
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
  }, [searchQuery, loader])

  // Transform LoaderResult[] to {value: string}[] format for Autocomplete
  const autocompleteOptions = useMemo(() => {
    return results
      .map((result) => {
        const key = result.value || result.label || result.id
        return key ? { value: key } : null
      })
      .filter((opt): opt is { value: string } => opt !== null)
  }, [results])

  // Handle query change - this is called by Autocomplete when user types
  const handleQueryChange = useCallback((query: string | null) => {
    setSearchQuery(query)
  }, [])

  // Handle option selection - map the value string back to full LoaderResult
  const handleSelect = useCallback(
    (value: string) => {
      const selectedResult = resultsMapRef.current.get(value)
      if (selectedResult) {
        onSelect(selectedResult)
        // Clear the search query and results
        setSearchQuery(null)
        setResults([])
        resultsMapRef.current.clear()
      }
    },
    [onSelect],
  )

  // Render each option in the dropdown
  const renderOption = useCallback(
    (option: { value: string }) => {
      const result = resultsMapRef.current.get(option.value)
      if (!result) {
        return <Text>{option.value}</Text>
      }

      return (
        <Stack space={1} padding={2}>
          <Text size={1} weight="medium">
            {result.value || result.label || result.id}
          </Text>
          {result.label && result.label !== result.value && (
            <Text size={0} muted>
              {result.label}
            </Text>
          )}
          {result.type && (
            <Text size={0} muted>
              Type: {result.type}
            </Text>
          )}
        </Stack>
      )
    },
    [],
  )

  return (
    <Stack space={2}>
      <Autocomplete
        id={autocompleteId}
        options={autocompleteOptions}
        onQueryChange={handleQueryChange}
        onSelect={handleSelect}
        renderOption={renderOption}
        loading={isLoading}
        placeholder={autocompleteProps.placeholder || 'Search...'}
        disabled={disabled}
        {...autocompleteProps}
      />
      {!isLoading &&
        !error &&
        searchQuery &&
        searchQuery.trim().length > 0 &&
        results.length === 0 && (
          <Card padding={2} radius={2} tone="transparent">
            <Text size={1}>No results for “{searchQuery.trim()}”.</Text>
          </Card>
        )}
      {error && (
        <Card padding={2} radius={2} tone="critical">
          <Text size={1}>{error}</Text>
        </Card>
      )}
    </Stack>
  )
}
