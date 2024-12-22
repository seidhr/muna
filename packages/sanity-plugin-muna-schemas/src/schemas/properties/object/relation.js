import { defineField } from 'sanity'

export const relation = defineField({
  name: 'relation',
  title: 'Relation',
  description: 'Unspecified relation',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'HumanMadeObject' }, { type: 'Actor' }, { type: 'Event' }, { type: 'Activity' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
