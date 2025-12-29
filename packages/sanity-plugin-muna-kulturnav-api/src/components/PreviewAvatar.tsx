import React from 'react'
import { Avatar, Flex, Text, Button } from '@sanity/ui'
import { CloseIcon } from '@sanity/icons'

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
    <Flex
      align="center"
      gap={2}
      padding={1}
      style={{ cursor: 'pointer', maxWidth: '100%' }}
      onClick={(e) => {
        e.stopPropagation()
        onShowDetails()
      }}
    >
      <Avatar
        size={1}
        color="blue"
        initials={initials}
        style={{ flexShrink: 0 }}
      />
      <Text
        size={1}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '200px',
        }}
      >
        {item.label || item.id}
      </Text>
      <Button
        mode="bleed"
        icon={CloseIcon}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onRemove()
        }}
        padding={1}
        tone="default"
        style={{ flexShrink: 0 }}
        aria-label="Remove"
      />
    </Flex>
  )
}

