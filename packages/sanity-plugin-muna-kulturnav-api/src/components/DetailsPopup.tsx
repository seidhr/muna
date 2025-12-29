import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Portal, Card, Stack, Text, Button, Heading, Box, Flex, Spinner, Badge, Code } from '@sanity/ui'
import { CloseIcon, LaunchIcon } from '@sanity/icons'

import type { KulturnavDetails, KulturnavReference } from '../types'

interface DetailsPopupProps {
  item: KulturnavReference
  details: KulturnavDetails | null
  isLoading: boolean
  onClose: () => void
}

/**
 * Extract value from JSON-LD object or return the value itself
 */
function extractJsonLdValue(value: any): string {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value['@value']) return value['@value']
  if (typeof value === 'object' && Array.isArray(value)) {
    // If it's an array, get the first value
    return value.map(extractJsonLdValue).filter(Boolean).join(', ') || ''
  }
  return String(value)
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

  return (
    <Portal>
      <Box
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,
          padding: 5,
        }}
        onClick={onClose}
      >
        <Card
          ref={popupRef}
          radius={3}
          shadow={3}
          style={{
            width: '100%',
            maxWidth: '640px',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <Card padding={[4, 4, 3, 4]} borderBottom>
            <Flex align="flex-start" justify="space-between" gap={3}>
              <Box flex={1} style={{ paddingRight: 5 }}>
                {isLoading ? (
                  <Flex direction="column" align="center" gap={3} paddingY={5}>
                    <Text size={1} muted>
                      Loading details...
                    </Text>
                    <Spinner />
                  </Flex>
                ) : details ? (
                  <Stack space={3}>
                    <Heading size={2}>{parsedCaption.name}</Heading>
                    <Flex gap={2} wrap="wrap">
                      {parsedCaption.dates && (
                        <Badge tone="default" padding={[1, 2]} radius={2}>
                          {parsedCaption.dates}
                        </Badge>
                      )}
                      {parsedCaption.language && (
                        <Badge tone="default" padding={[1, 2]} radius={2}>
                          {parsedCaption.language}
                        </Badge>
                      )}
                      {parsedCaption.profession && (
                        <Badge tone="primary" padding={[1, 2]} radius={2}>
                          {parsedCaption.profession}
                        </Badge>
                      )}
                    </Flex>
                  </Stack>
                ) : (
                  <Heading size={2}>{item.label || 'Untitled'}</Heading>
                )}
              </Box>
              <Button
                icon={CloseIcon}
                mode="bleed"
                onClick={onClose}
                tone="default"
                padding={2}
                aria-label="Close"
              />
            </Flex>
          </Card>

          {/* Content */}
          {!isLoading && (
            <Box padding={4} style={{ overflowY: 'auto', flex: 1 }}>
              {details ? (
                <Stack space={4}>
                  {/* Description */}
                  {(extractJsonLdValue(details.description) || extractJsonLdValue(details.definition)) && (
                    <Text size={1} muted>
                      {extractJsonLdValue(details.description || details.definition)}
                    </Text>
                  )}

                  {/* Metadata Grid */}
                  <Card padding={3} radius={2} tone="default">
                    <Stack space={3}>
                      <Stack space={1}>
                        <Text size={0} weight="semibold" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }} muted>
                          Type
                        </Text>
                        <Text size={1} weight="medium">
                          {extractJsonLdValue(details.entityType) ||
                            (details['@type'] && Array.isArray(details['@type'])
                              ? details['@type'].join(', ')
                              : extractJsonLdValue(details['@type'])) ||
                            item.type}
                        </Text>
                      </Stack>

                      {extractJsonLdValue(details.datasetCaption) && (
                        <Stack space={1}>
                          <Text size={0} weight="semibold" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }} muted>
                            Dataset
                          </Text>
                          <Text size={1}>
                            {extractJsonLdValue(details.datasetCaption)}
                          </Text>
                        </Stack>
                      )}

                      {details.uuid && (
                        <Stack space={1}>
                          <Text size={0} weight="semibold" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }} muted>
                            UUID
                          </Text>
                          <Code size={0} style={{ wordBreak: 'break-all' }}>
                            {details.uuid}
                          </Code>
                        </Stack>
                      )}
                    </Stack>
                  </Card>

                  {/* External Link */}
                  {externalUrl && (
                    <Button
                      as="a"
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      text="View on Kulturnav"
                      icon={LaunchIcon}
                      tone="primary"
                      mode="ghost"
                    />
                  )}

                  {/* Full Details (Expandable) */}
                  {Object.keys(details).length > 0 && (
                    <details>
                      <summary style={{ cursor: 'pointer', listStyle: 'none' }}>
                        <Button mode="bleed" tone="default" text="Show all details" />
                      </summary>
                      <Box marginTop={2}>
                        <Card padding={3} radius={2} tone="default">
                          <Code size={0} style={{ maxHeight: '400px', overflow: 'auto', display: 'block' }}>
                            {JSON.stringify(details, null, 2)}
                          </Code>
                        </Card>
                      </Box>
                    </details>
                  )}
                </Stack>
              ) : (
                <Flex direction="column" align="center" gap={3} paddingY={5}>
                  <Text size={1} muted>
                    No additional details available
                  </Text>
                  {externalUrl && (
                    <Button
                      as="a"
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      text="View on Kulturnav"
                      icon={LaunchIcon}
                      tone="primary"
                      mode="ghost"
                    />
                  )}
                </Flex>
              )}
            </Box>
          )}
        </Card>
      </Box>
    </Portal>
  )
}
