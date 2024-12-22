import { defineField } from 'sanity'

export const transferredTitleTo = defineField({
  name: 'transferredTitleTo',
  title: 'Transferred title to',
  description: '',
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
