export default {
  name: 'HeroBlock',
  type: 'object',
  title: 'Hero',
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
      name: 'label',
      title: 'Tittel',
      titleEN: 'Heading',
      type: 'string',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      titleEN: 'Tagline',
      description: 'Tagline under tittelen. Bør ikke være lengre en to korte avsnitt.',
      descriptionEN: 'Tagline under the title. Should not be longer than two short paragraphs.',
      type: 'blockContent',
    },
    {
      name: 'items',
      title: 'Objekt',
      titleEN: 'Item',
      type: 'ObjectBlockItem',
    },
  ],
  preview: {
    select: {
      title: 'label',
      media: 'illustration',
      object: 'item.image',
      disabled: 'disabled',
    },
    prepare({ title, media, object, disabled }) {
      return {
        title: `${title}`,
        subtitle: `Hero. ${disabled ? 'Avslått' : ''}`,
        media: media?.image ?? object,
      }
    },
  },
}
