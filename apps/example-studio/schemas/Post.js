import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'Post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'timespan',
      title: 'Timespan',
      type: 'Timespan',
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return { ...selection }
    },
  },
})