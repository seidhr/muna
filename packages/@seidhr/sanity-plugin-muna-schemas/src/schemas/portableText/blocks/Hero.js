export default {
  name: 'Hero',
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
      name: 'Label',
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
      name: 'illustration',
      title: 'Illustrasjonsbilde',
      titleEN: 'Illustration',
      description: 'Bakgrunnsbilde under teksten',
      descriptionEN: 'Illustration below the text',
      type: 'Illustration',
    },
  ],
  preview: {
    select: {
      title: 'label',
      media: 'illustration',
      disabled: 'disabled',
    },
    prepare({ title, media, disabled }) {
      return {
        title: `${disabled ? 'Avslått' : title}`,
        subtitle: 'Hero',
        media: media?.image,
      }
    },
  },
}
