import { defineType } from 'sanity'

export default defineType({
  name: 'HumanMadeObject',
  type: 'document',
  title: 'Human made object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
  ],
})
