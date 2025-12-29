import React from 'react'
import { Badge, Flex, Text, Button } from '@sanity/ui'
import { CloseIcon } from '@sanity/icons'

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
    <Badge
      tone="primary"
      padding={[1, 2]}
      radius={2}
      style={{ cursor: 'pointer', maxWidth: '100%' }}
      onClick={(e) => {
        e.stopPropagation()
        onShowDetails()
      }}
    >
      <Flex align="center" gap={2}>
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
          padding={0}
          tone="default"
          style={{ flexShrink: 0 }}
          aria-label="Remove"
        />
      </Flex>
    </Badge>
  )
}

