import React from 'react'

import type { PreviewComponentProps } from '../types'

/**
 * Badge-style preview (default for concepts)
 *
 * @public
 */
export function PreviewBadge({
  item,
  onRemove,
  onShowDetails,
}: PreviewComponentProps): React.JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 8px',
        maxWidth: '100%',
        border: '1px solid #2276fc',
        backgroundColor: 'transparent',
        color: '#2276fc',
        borderRadius: '4px',
        fontSize: '13px',
        cursor: 'pointer',
      }}
      onClick={(e) => {
        e.stopPropagation()
        onShowDetails()
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f0f7ff'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
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
          onRemove()
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
  )
}

