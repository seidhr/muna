import React from 'react'
import { Badge, Flex, Button } from '@sanity/ui'
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
      style={{ cursor: 'pointer', display: 'inline-flex' }}
      onClick={(e) => {
        e.stopPropagation()
        onShowDetails()
      }}
    >
      <Flex align="center" gap={1}>
        <span>{item.label || item.id}</span>
        <Button
          mode="bleed"
          icon={CloseIcon}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onRemove()
          }}
          padding={0}
          tone="primary"
          aria-label="Remove"
        />
      </Flex>
    </Badge>
  )
}
