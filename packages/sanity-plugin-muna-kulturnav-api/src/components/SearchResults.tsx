import React from 'react'
import { Card, Stack, Text, Box } from '@sanity/ui'

import type { KulturnavAutocompleteItem } from '../types'

interface SearchResultsProps {
  results: KulturnavAutocompleteItem[]
  onSelect: (item: KulturnavAutocompleteItem) => void
  isLoading?: boolean
}

export function SearchResults({
  results,
  onSelect,
  isLoading,
}: SearchResultsProps): React.JSX.Element | null {
  if (isLoading) {
    return (
      <Card padding={3} radius={2} shadow={1}>
        <Text size={1} muted>
          Searching...
        </Text>
      </Card>
    )
  }

  if (results.length === 0) {
    return (
      <Card padding={3} radius={2} shadow={1}>
        <Text size={1} muted>
          No results found
        </Text>
      </Card>
    )
  }

  return (
    <Card radius={2} shadow={2} style={{ maxHeight: '300px', overflowY: 'auto' }}>
      <Stack space={1} padding={1}>
        {results.map((item) => (
          <Box
            key={item.uuid}
            padding={3}
            style={{ cursor: 'pointer' }}
            onClick={() => onSelect(item)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-hovered-bg-color)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
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
        ))}
      </Stack>
    </Card>
  )
}

