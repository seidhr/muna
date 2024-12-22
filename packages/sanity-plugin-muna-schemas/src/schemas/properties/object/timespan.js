import { defineField } from 'sanity'

export const timespan = defineField({
  name: 'timespan',
  title: 'Timespan',
  type: 'array',
  of: [{ type: 'Timespan' }],
  options: {
    editModal: 'fullscreen',
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
  validation: (Rule) => Rule.length(1).warning('You should only register one timespan'),
})
