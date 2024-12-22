import { defineField } from 'sanity'

export const carriedOutBy = defineField({
  name: 'carriedOutBy',
  title: 'Carried out by',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Actor' }],
    },
  ],
})
