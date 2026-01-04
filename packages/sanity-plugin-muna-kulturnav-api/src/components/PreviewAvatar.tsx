import React from 'react'
import { PreviewBadge } from './PreviewBadge'
import type { PreviewComponentProps } from '../types'

/**
 * Avatar-style preview (default for persons)
 * Now uses the same badge style as other previews
 *
 * @public
 */
export function PreviewAvatar(props: PreviewComponentProps): React.JSX.Element {
  return <PreviewBadge {...props} />
}

