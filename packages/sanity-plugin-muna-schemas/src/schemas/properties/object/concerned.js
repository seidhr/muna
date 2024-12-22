import { defineField } from 'sanity'

export const concerned = defineField({
  name: 'concerned',
  title: 'About',
  description: 'Which collection(s) or object(s) is this an assessment of.',
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
