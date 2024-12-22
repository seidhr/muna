export default {
  name: 'TableBlock',
  type: 'object',
  title: 'Tabell',
  titleEN: 'Table',
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
      titleEN: 'Title',
      type: 'string',
    },
    {
      name: 'data',
      title: 'Illustrasjonsbilde',
      titleEN: 'Illustration',
      type: 'table',
    },
  ],
  preview: {
    select: {
      title: 'label',
      disabled: 'disabled',
    },
    prepare({ title, disabled }) {
      return {
        title: title,
        subtitle: `${disabled ? 'Avslått: ' : ''}Tabell`,
      }
    },
  },
}
