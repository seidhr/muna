import { defineField } from 'sanity'

export const transferredTitleOf = defineField({
  name: 'transferredTitleOf',
  title: 'Transferred title of',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'HumanMadeObject' }, { type: 'Collection' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
