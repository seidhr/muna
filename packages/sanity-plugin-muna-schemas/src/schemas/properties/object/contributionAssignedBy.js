import { defineField } from 'sanity'

export const contributionAssignedBy = defineField({
  name: 'contributionAssignedBy',
  title: 'Utført av',
  titleEN: 'Contribution assigned by',
  type: 'array',
  of: [{ type: 'ContributionAssignment' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
