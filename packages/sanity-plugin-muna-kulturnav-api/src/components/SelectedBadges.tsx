import React, { useCallback, useMemo, useRef, useState } from 'react'

import type { KulturnavReference, PreviewComponentProps, PreviewStyle } from '../types'
import { getPluginConfig, getClientConfig } from '../lib/config'
import { fetchKulturnavDetails, extractUuidFromId } from '../lib/kulturnavClient'
import { PreviewAvatar } from './PreviewAvatar'
import { PreviewBadge } from './PreviewBadge'
import { DetailsPopup } from './DetailsPopup'

interface SelectedBadgesProps {
  items: KulturnavReference[]
  onRemove: (index: number) => void
}

/**
 * Get preview style for an item
 */
function getPreviewStyle(
  item: KulturnavReference,
  defaultStyle?: PreviewStyle | ((item: KulturnavReference) => PreviewStyle),
): PreviewStyle {
  if (typeof defaultStyle === 'function') {
    return defaultStyle(item)
  }
  if (defaultStyle) {
    return defaultStyle
  }
  // Default: avatar for Person, badge for others
  return item.type === 'Person' ? 'avatar' : 'badge'
}

/**
 * Get preview component for an item
 */
function getPreviewComponent(
  item: KulturnavReference,
  style: PreviewStyle,
  customComponent?: (props: PreviewComponentProps) => React.ReactElement,
): (props: PreviewComponentProps) => React.ReactElement {
  if (customComponent) {
    return customComponent
  }

  switch (style) {
    case 'avatar':
      return PreviewAvatar
    case 'badge':
      return PreviewBadge
    default:
      return PreviewBadge
  }
}

export function SelectedBadges({
  items,
  onRemove,
}: SelectedBadgesProps): React.JSX.Element | null {
  const [selectedItem, setSelectedItem] = useState<KulturnavReference | null>(null)
  const [details, setDetails] = useState<Record<string, any>>({})
  const [loadingDetails, setLoadingDetails] = useState<Record<string, boolean>>({})
  
  // Use refs to track state for memoization checks
  const detailsRef = useRef<Record<string, any>>({})
  const loadingRef = useRef<Record<string, boolean>>({})
  
  // Sync refs with state
  React.useEffect(() => {
    detailsRef.current = details
  }, [details])
  
  React.useEffect(() => {
    loadingRef.current = loadingDetails
  }, [loadingDetails])

  const config = useMemo(() => getPluginConfig(), [])

  // Get preview style and component from config
  const defaultPreviewStyle = useMemo(
    () => config.defaultPreviewStyle,
    [config.defaultPreviewStyle],
  )
  const defaultPreviewComponent = useMemo(
    () => config.previewComponent,
    [config.previewComponent],
  )

  const handleShowDetails = useCallback(
    async (item: KulturnavReference) => {
      setSelectedItem(item)

      // Use UUID directly from item, or extract from ID as fallback
      const uuid = item.uuid || extractUuidFromId(item.id)
      if (!uuid) {
        console.warn('No UUID found for item:', item)
        return
      }

      const cacheKey = item.id

      // Check if already loaded or loading using refs
      if (detailsRef.current[cacheKey] || loadingRef.current[cacheKey]) {
        return // Already loaded or loading
      }

      // Mark as loading
      loadingRef.current[cacheKey] = true
      setLoadingDetails((prev) => ({ ...prev, [cacheKey]: true }))

      try {
        const clientConfig = getClientConfig()
        // Fetch full entity details from core API using the UUID
        const itemDetails = await fetchKulturnavDetails(uuid, {
          apiBaseUrl: clientConfig.apiBaseUrl || 'https://kulturnav.org',
          apiVersion: clientConfig.apiVersion || 'v1.5',
        })
        detailsRef.current[cacheKey] = itemDetails
        setDetails((prev) => ({ ...prev, [cacheKey]: itemDetails }))
      } catch (error) {
        console.error('Failed to fetch details:', error)
        detailsRef.current[cacheKey] = null
        setDetails((prev) => ({ ...prev, [cacheKey]: null }))
      } finally {
        loadingRef.current[cacheKey] = false
        setLoadingDetails((prev) => ({ ...prev, [cacheKey]: false }))
      }
    },
    [],
  )

  const handleCloseDetails = useCallback(() => {
    setSelectedItem(null)
  }, [])

  if (items.length === 0) {
    return null
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
        {items.map((item, index) => {
          const style = getPreviewStyle(item, defaultPreviewStyle)
          const PreviewComponent = getPreviewComponent(item, style, defaultPreviewComponent)

          return (
            <PreviewComponent
              key={item.id || index}
              item={item}
              onRemove={() => onRemove(index)}
              onShowDetails={() => handleShowDetails(item)}
              details={details[item.id] || null}
              isLoadingDetails={loadingDetails[item.id] || false}
            />
          )
        })}
      </div>

      {selectedItem && (
        <DetailsPopup
          item={selectedItem}
          details={details[selectedItem.id] || null}
          isLoading={loadingDetails[selectedItem.id] || false}
          onClose={handleCloseDetails}
        />
      )}
    </>
  )
}
