import { defineField } from 'sanity'

export const memberOf = defineField({
  name: 'memberOf',
  title: 'Member of',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Actor' }],
      options: {
        filter: '_type == "Actor" && references($id)',
        filterParams: { id: 'd4ad3e47-1498-4b95-9b7f-c25be386691a' }, // Group
      },
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
