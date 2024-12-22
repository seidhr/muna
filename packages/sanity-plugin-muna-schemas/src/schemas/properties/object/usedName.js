import { defineField } from 'sanity'

export const usedName = defineField({
  name: 'usedName',
  title: 'Name',
  description: 'Used if the object is signed with another than the preferred name of the actor.',
  type: 'Name',
})
