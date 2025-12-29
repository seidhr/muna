import { useCallback, useEffect, useRef, useState } from 'react'
import React from 'react'
import { TextInput, Flex, Spinner, Stack, Text, Card } from '@sanity/ui'

import type { KulturnavAutocompleteItem, SearchFilters } from '../types'
import { searchKulturnav } from '../lib/kulturnavClient'
import type { KulturnavClientConfig } from '../lib/kulturnavClient'
import { SearchResults } from './SearchResults'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<KulturnavAutocompleteItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Debounced search
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    if (searchQuery.trim().length === 0) {
      setResults([])
      setShowResults(false)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const searchResults = await searchKulturnav(searchQuery, filters, config)
        setResults(searchResults)
        setShowResults(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to search')
        setResults([])
        setShowResults(false)
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = useCallback(
    (item: KulturnavAutocompleteItem) => {
      onSelect(item)
      setSearchQuery('')
      setShowResults(false)
      setResults([])
    },
    [onSelect],
  )

  return (
    <Stack space={2}>
      <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
        <Flex align="center" gap={2}>
          <div style={{ flex: 1, position: 'relative' }}>
            <TextInput
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.currentTarget.value)
                onChange(e.currentTarget.value)
              }}
              placeholder={placeholder}
              disabled={disabled}
            />
          </div>
          {isLoading && <Spinner />}
        </Flex>

        {error && (
          <Card padding={2} radius={2} tone="critical" marginTop={1}>
            <Text size={1}>{error}</Text>
          </Card>
        )}

        {showResults && results.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1000,
              marginTop: '4px',
            }}
          >
            <SearchResults results={results} onSelect={handleSelect} isLoading={isLoading} />
          </div>
        )}
      </div>
    </Stack>
  )
}

