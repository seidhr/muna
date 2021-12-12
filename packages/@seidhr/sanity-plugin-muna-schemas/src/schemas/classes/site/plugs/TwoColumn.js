export default {
  name: 'TwoColumn',
  type: 'object',
  title: 'To kolonner',
  titleEN: 'Two column',
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
      name: 'subtitle',
      title: 'Undertittel',
      titleEN: 'Subtitle',
      type: 'string',
    },
    {
      name: 'firstColumn',
      title: 'Første kolonne',
      titleEN: 'First column',
      type: 'blockContent',
    },
    {
      name: 'secondColumn',
      title: 'Andre kolonne',
      titleEN: 'Second column',
      type: 'blockContent',
    },
    {
      name: 'anchor',
      title: 'Anker',
      titleEN: 'Anchor',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
      content: 'firstColumn',
    },
    prepare({title, content}) {
      const text = content
        ? content[0].children
            .filter((child) => child._type === 'span')
            .map((span) => span.text)
            .join('')
        : ''

      return {
        title: title ? title : text ? text : '',
        subtitle: 'To kolonner',
      }
    },
  },
}
