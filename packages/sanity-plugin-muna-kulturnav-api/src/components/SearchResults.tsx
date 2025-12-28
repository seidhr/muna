import React from 'react'

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
      <div
        style={{
          padding: '12px',
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          backgroundColor: '#fff',
          color: '#666',
          fontSize: '13px',
        }}
      >
        Searching...
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div
        style={{
          padding: '12px',
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          backgroundColor: '#fff',
          color: '#666',
          fontSize: '13px',
        }}
      >
        No results found
      </div>
    )
  }

  return (
    <div
      style={{
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
        maxHeight: '300px',
        overflowY: 'auto',
        backgroundColor: '#fff',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {results.map((item) => (
          <div
            key={item.uuid}
            style={{
              padding: '12px',
              cursor: 'pointer',
            }}
            onClick={() => onSelect(item)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e5e5'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#000',
                }}
              >
                {item.caption}
              </div>
              {item.datasetCaption && (
                <div
                  style={{
                    fontSize: '12px',
                    color: '#666',
                  }}
                >
                  {item.datasetCaption}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

