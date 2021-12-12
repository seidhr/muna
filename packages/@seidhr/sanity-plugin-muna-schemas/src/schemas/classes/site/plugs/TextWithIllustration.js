export default {
  type: 'object',
  name: 'TextWithIllustration',
  title: 'Tekst med illustrasjon',
  titleEN: 'Text with illustration',
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
      name: 'title',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Tekst',
      titleEN: 'Text',
      type: 'simpleBlockContent',
    },
    {
      name: 'illustration',
      title: 'Illustrasjonsbilde',
      titleEN: 'Illustration',
      type: 'Illustration',
    },
  ],
}
