export default {
  name: 'SocialCollection',
  type: 'object',
  title: 'Social collection',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      name: 'items',
      title: 'Objekt',
      titleEN: 'Items',
      type: 'array',
      validation: (Rule) => Rule.unique(),
      of: [{type: 'Social'}],
    },
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare: ({items}) => ({
      title: 'Social testimoinal collection',
      subtitle: `${items.length} tweet(s)`,
    }),
  },
}
