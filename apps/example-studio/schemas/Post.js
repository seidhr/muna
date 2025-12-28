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
    defineField({
      name: 'creator',
      title: 'Creator',
      type: 'array',
      description: 'References to people from kulturnav.org',
      of: [
        {
          type: 'kulturnavReference',
        },
      ],
      options: {
        entityType: 'Person',
        lang: 'no',
      },
    }),
    defineField({
      name: 'subjects',
      title: 'Subjects',
      type: 'array',
      description: 'Array of concept references from kulturnav.org',
      of: [
        {
          type: 'kulturnavReference',
        },
      ],
      options: {
        entityType: 'Concept',
        lang: 'no',
      },
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