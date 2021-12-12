export default {
  name: 'ActorCollection',
  type: 'object',
  title: 'Actor collection',
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
      name: 'view',
      title: 'Visningsvalg',
      titleEN: 'View choice',
      description: 'Velg enkeltside-visning eller galleri med alle objektets bilder. Bokvisning er standard.',
      type: 'string',
      options: {
        list: [
          { title: 'Profile', value: 'profile' },
          { title: 'Compact', value: 'compact' },
          { title: 'Card', value: 'card' },
        ],
      },
    },
    {
      name: 'title',
      title: 'Tittel eller navn',
      titleEN: 'Heading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'simpleBlockContent',
    },
    {
      name: 'items',
      title: 'Aktører',
      titleEN: 'Items',
      type: 'array',
      validation: (Rule) => Rule.unique(),
      of: [{ type: 'SingleActor' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare: ({ items, title }) => ({
      title: title,
      subtitle: `${items.length} actor(s)`,
    }),
  },
}
