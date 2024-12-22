import { defineField } from 'sanity'

export const assignedActor = defineField({
  name: 'assignedActor',
  title: 'Actor',
  type: 'reference',
  to: [{ type: 'Actor' }],
})
