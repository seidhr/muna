import React from 'react'

import type { PreviewComponentProps } from '../types'

/**
 * Avatar-style preview (default for persons)
 *
 * @public
 */
export function PreviewAvatar({
  item,
  onRemove,
  onShowDetails,
}: PreviewComponentProps): React.JSX.Element {
  const initials = item.label
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?'

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '4px',
        maxWidth: '100%',
        cursor: 'pointer',
      }}
      onClick={(e) => {
        e.stopPropagation()
        onShowDetails()
      }}
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#2276fc',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: '500',
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
      <span
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '200px',
          fontSize: '13px',
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
          padding: '2px 4px',
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          color: '#666',
          fontSize: '16px',
          lineHeight: '1',
          opacity: 0.7,
          borderRadius: '4px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1'
          e.currentTarget.style.backgroundColor = '#fee'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.7'
          e.currentTarget.style.backgroundColor = 'transparent'
        }}
        aria-label="Remove"
        type="button"
      >
        ×
      </button>
    </div>
  )
}

