import React, { useEffect, useMemo, useRef, useState } from 'react'

import type { KulturnavDetails, KulturnavReference } from '../types'

interface DetailsPopupProps {
  item: KulturnavReference
  details: KulturnavDetails | null
  isLoading: boolean
  onClose: () => void
}

/**
 * Parse kulturnav caption to extract structured information
 */
function parseCaption(caption: string): {
  name: string
  dates?: string
  language?: string
  profession?: string
} {
  // Pattern: "Name (dates) [lang] Profession" or variations
  const match = caption.match(/^(.+?)(?:\s*\(([^)]+)\))?(?:\s*\[([^\]]+)\])?(?:\s+(.+))?$/)
  if (!match) {
    return { name: caption }
  }

  const [, name, dates, language, profession] = match
  return {
    name: name.trim(),
    dates: dates?.trim(),
    language: language?.trim(),
    profession: profession?.trim(),
  }
}

/**
 * Detect if dark mode is active
 */
function useDarkMode(): boolean {
  const [isDark, setIsDark] = useState(() => {
    // Check if body has dark background or if prefers-color-scheme is dark
    if (typeof window === 'undefined') return false

    // Check Sanity's theme by looking at body background
    const bodyBg = window.getComputedStyle(document.body).backgroundColor
    const rgb = bodyBg.match(/\d+/g)
    if (rgb) {
      const [r, g, b] = rgb.map(Number)
      // If background is dark (average < 128), it's dark mode
      const avg = (r + g + b) / 3
      if (avg < 128) return true
    }

    // Fallback to prefers-color-scheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Watch for changes in body background
    const observer = new MutationObserver(() => {
      const bodyBg = window.getComputedStyle(document.body).backgroundColor
      const rgb = bodyBg.match(/\d+/g)
      if (rgb) {
        const [r, g, b] = rgb.map(Number)
        const avg = (r + g + b) / 3
        setIsDark(avg < 128)
      }
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    })

    // Also watch for media query changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return isDark
}

/**
 * Popup component to show detailed information about a kulturnav reference
 *
 * @public
 */
export function DetailsPopup({
  item,
  details,
  isLoading,
  onClose,
}: DetailsPopupProps): React.JSX.Element {
  const popupRef = useRef<HTMLDivElement>(null)
  const isDark = useDarkMode()

  const parsedCaption = useMemo(() => {
    // Try to get caption from details first, then from item
    let caption = details?.caption || item.label || ''

    // Handle JSON-LD format: entity.fullCaption, name, or title with @value
    if (details && !caption) {
      if (details['entity.fullCaption']) {
        const fullCaption = details['entity.fullCaption']
        if (typeof fullCaption === 'object' && fullCaption['@value']) {
          caption = fullCaption['@value']
        } else if (typeof fullCaption === 'string') {
          caption = fullCaption
        }
      } else if (details.name) {
        const name = details.name
        if (typeof name === 'object' && name['@value']) {
          caption = name['@value']
        } else if (typeof name === 'string') {
          caption = name
        }
      } else if (details.title) {
        const title = details.title
        if (typeof title === 'object' && title['@value']) {
          caption = title['@value']
        } else if (typeof title === 'string') {
          caption = title
        }
      }
    }

    return parseCaption(caption)
  }, [details?.caption, details?.['entity.fullCaption'], details?.name, details?.title, item.label])

  // Close on escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  // Extract UUID for external link
  const uuid = useMemo(() => {
    const match = item.id.match(/\/([a-f0-9-]+)$/i)
    return match ? match[1] : null
  }, [item.id])

  const externalUrl = uuid ? `https://kulturnav.org/${uuid}` : null

  // Dark mode colors
  const bgColor = isDark ? '#1a1a1a' : '#fff'
  const textColor = isDark ? '#e5e5e5' : '#1a1a1a'
  const textColorMuted = isDark ? '#999' : '#666'
  const textColorLight = isDark ? '#666' : '#999'
  const borderColor = isDark ? '#333' : '#e5e5e5'
  const bgColorSecondary = isDark ? '#252525' : '#f9f9f9'
  const bgColorTertiary = isDark ? '#2a2a2a' : '#f5f5f5'
  const hoverBg = isDark ? '#333' : '#f0f0f0'
  const overlayBg = isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)'

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: overlayBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999, // Very high z-index to appear above all panels
        padding: '20px',
      }}
    >
      <div
        ref={popupRef}
        style={{
          backgroundColor: bgColor,
          borderRadius: '12px',
          padding: '0',
          width: '100%',
          maxWidth: '640px',
          maxHeight: '90vh',
          overflow: 'hidden',
          boxShadow: isDark
            ? '0 8px 32px rgba(0, 0, 0, 0.5)'
            : '0 8px 32px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          color: textColor,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 24px 20px 24px',
            borderBottom: `1px solid ${borderColor}`,
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '24px',
              color: textColorMuted,
              padding: '8px',
              lineHeight: '1',
              borderRadius: '6px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hoverBg
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
            aria-label="Close"
            type="button"
          >
            ×
          </button>

          {isLoading ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: textColorMuted }}>
              <div style={{ marginBottom: '8px' }}>Loading details...</div>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  border: `3px solid ${borderColor}`,
                  borderTopColor: '#2276fc',
                  borderRadius: '50%',
                  margin: '0 auto',
                  animation: 'spin 0.6s linear infinite',
                }}
              >
                <style>
                  {`
                    @keyframes spin {
                      to { transform: rotate(360deg); }
                    }
                  `}
                </style>
              </div>
            </div>
          ) : details ? (
            <div>
              <h2
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '24px',
                  fontWeight: '600',
                  lineHeight: '1.3',
                  color: textColor,
                  paddingRight: '40px',
                }}
              >
                {parsedCaption.name}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px' }}>
                {parsedCaption.dates && (
                  <div
                    style={{
                      fontSize: '14px',
                      color: textColorMuted,
                      padding: '4px 12px',
                      backgroundColor: bgColorTertiary,
                      borderRadius: '16px',
                    }}
                  >
                    {parsedCaption.dates}
                  </div>
                )}
                {parsedCaption.language && (
                  <div
                    style={{
                      fontSize: '14px',
                      color: textColorMuted,
                      padding: '4px 12px',
                      backgroundColor: bgColorTertiary,
                      borderRadius: '16px',
                    }}
                  >
                    {parsedCaption.language}
                  </div>
                )}
                {parsedCaption.profession && (
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#2276fc',
                      padding: '4px 12px',
                      backgroundColor: isDark ? '#1a2a3a' : '#f0f7ff',
                      borderRadius: '16px',
                      fontWeight: '500',
                    }}
                  >
                    {parsedCaption.profession}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '24px',
                  fontWeight: '600',
                  lineHeight: '1.3',
                  color: textColor,
                  paddingRight: '40px',
                }}
              >
                {item.label || 'Untitled'}
              </h2>
            </div>
          )}
        </div>

        {/* Content */}
        {!isLoading && (
          <div
            style={{
              padding: '24px',
              overflowY: 'auto',
              flex: 1,
            }}
          >
            {details ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Description */}
                {(details.description || details.definition) && (
                  <div>
                    <p
                      style={{
                        margin: '0',
                        color: textColorMuted,
                        fontSize: '15px',
                        lineHeight: '1.6',
                      }}
                    >
                      {details.description || details.definition}
                    </p>
                  </div>
                )}

                {/* Metadata Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: bgColorSecondary,
                    borderRadius: '8px',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: textColorLight,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: '600',
                        marginBottom: '6px',
                      }}
                    >
                      Type
                    </div>
                    <div style={{ fontSize: '14px', color: textColor, fontWeight: '500' }}>
                      {details.entityType || item.type}
                    </div>
                  </div>

                  {details.datasetCaption && (
                    <div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: textColorLight,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: '600',
                          marginBottom: '6px',
                        }}
                      >
                        Dataset
                      </div>
                      <div style={{ fontSize: '14px', color: textColor }}>
                        {details.datasetCaption}
                      </div>
                    </div>
                  )}

                  {details.uuid && (
                    <div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: textColorLight,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: '600',
                          marginBottom: '6px',
                        }}
                      >
                        UUID
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          fontFamily: 'monospace',
                          color: textColorMuted,
                          wordBreak: 'break-all',
                        }}
                      >
                        {details.uuid}
                      </div>
                    </div>
                  )}
                </div>

                {/* External Link */}
                {externalUrl && (
                  <div>
                    <a
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        color: '#2276fc',
                        textDecoration: 'none',
                        padding: '8px 16px',
                        border: '1px solid #2276fc',
                        borderRadius: '6px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? '#1a2a3a' : '#f0f7ff'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      <span>View on Kulturnav</span>
                      <span style={{ fontSize: '12px' }}>↗</span>
                    </a>
                  </div>
                )}

                {/* Full Details (Expandable) */}
                {Object.keys(details).length > 0 && (
                  <details style={{ marginTop: '8px' }}>
                    <summary
                      style={{
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: textColorMuted,
                        padding: '8px 12px',
                        backgroundColor: bgColorTertiary,
                        borderRadius: '6px',
                        listStyle: 'none',
                        userSelect: 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = hoverBg
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = bgColorTertiary
                      }}
                    >
                      <span style={{ marginRight: '8px' }}>▼</span>
                      Show all details
                    </summary>
                    <pre
                      style={{
                        fontSize: '12px',
                        padding: '16px',
                        backgroundColor: bgColorSecondary,
                        borderRadius: '6px',
                        overflow: 'auto',
                        maxHeight: '400px',
                        marginTop: '8px',
                        border: `1px solid ${borderColor}`,
                        fontFamily: 'monospace',
                        lineHeight: '1.5',
                        color: textColorMuted,
                      }}
                    >
                      {JSON.stringify(details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: textColorMuted }}>
                <div style={{ fontSize: '16px', marginBottom: '8px' }}>
                  No additional details available
                </div>
                <div style={{ fontSize: '14px', color: textColorLight }}>
                  {externalUrl && (
                    <a
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#2276fc', textDecoration: 'none' }}
                    >
                      View on Kulturnav →
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
