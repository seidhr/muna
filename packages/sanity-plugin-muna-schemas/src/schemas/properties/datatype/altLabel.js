/**
 * skos:altLabel
 */

import { defineField } from 'sanity'

export const altLabel = defineField({
  name: 'altLabel',
  title: 'Alternative label',
  type: 'LocalizedString',
  options: {
    semanticSanity: {
      '@container': '@language',
    },
  },
})
