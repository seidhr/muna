import { defineField } from 'sanity'

export const transferredTitleFrom = defineField({
  name: 'transferredTitleFrom',
  title: 'Transferred title from',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Actor' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
