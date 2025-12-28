import { defineField, defineType } from 'sanity'
/* import { APISearchInput } from '@seidhr/sanity-plugin-muna-kulturnav-api' */

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
    /* defineField({
      name: 'classified_as',
      title: 'Classified as',
      type: 'string',
      inputComponent: APISearchInput,
    }), */
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