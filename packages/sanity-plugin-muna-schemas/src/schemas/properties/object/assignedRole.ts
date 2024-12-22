import { defineField } from 'sanity'

export const assignedRole = defineField({
  name: 'assignedRole',
  title: 'Role',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Role' }],
    },
  ],
})
