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
          // Field-level options override plugin defaults
          // This field will search for Person entities instead of Concept
          options: {
            loaderOptions: {
              entityTypes: ['Person'],
            },
            autocompleteProps: {
              placeholder: 'Search for a person...',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'subjects',
      title: 'Subjects',
      type: 'array',
      description: 'Array of concept references from kulturnav.org',
      of: [
        {
          type: 'kulturnavReference',
          // This field uses the plugin default (Concept) from sanity.config.ts
          // but you could override it here if needed:
          // options: { loaderOptions: { entityTypes: ['Concept'] } }
        },
      ],
    }),
    defineField({
      name: 'related_posts',
      title: 'Related Posts',
      type: 'array',
      description: 'References to other posts',
      of: [
        {
          type: 'reference',
          to: [{ type: 'Post' }],
        },
      ],
    }),
    defineField({
      name: 'disney',
      type: 'array',
      description: 'References to disney characters',
      of: [
        {
          type: 'disneyCharacter',
        },
      ],
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