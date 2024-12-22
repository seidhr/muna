/**
 * hasMember
 * la:has_member
 */

import { defineField } from 'sanity'

export const hasMember = defineField({
  name: 'hasMember',
  title: 'Has member',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'HumanMadeObject' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
