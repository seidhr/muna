import { defineField } from 'sanity'

export const hadParticipant = defineField({
  name: 'hadParticipant',
  title: 'Had participant',
  type: 'array',
  of: [{ type: 'ContributionAssignment' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
