/**
 * P35_has_identified
 */

import { defineField } from 'sanity'

export const hasIdentified = defineField({
  name: 'hasIdentified',
  title: 'Has identified condition states',
  type: 'array',
  of: [{ type: 'ConditionState' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
