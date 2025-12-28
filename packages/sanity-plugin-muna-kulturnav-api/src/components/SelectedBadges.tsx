import React from 'react'

import type { KulturnavReference } from '../types'

interface SelectedBadgesProps {
  items: KulturnavReference[]
  onRemove: (index: number) => void
}

export function SelectedBadges({
  items,
  onRemove,
}: SelectedBadgesProps): React.JSX.Element | null {
  if (items.length === 0) {
    return null
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 8px',
            maxWidth: '100%',
            backgroundColor: '#2276fc',
            color: '#fff',
            borderRadius: '4px',
            fontSize: '13px',
          }}
        >
          <span
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '200px',
            }}
          >
            {item.label || item.id}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onRemove(index)
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0',
              margin: '0',
              display: 'flex',
              alignItems: 'center',
              color: 'inherit',
              fontSize: '14px',
              lineHeight: '1',
              opacity: 0.7,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.7'
            }}
            aria-label="Remove"
            type="button"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

