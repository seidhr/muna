export default {
  name: 'TocSection',
  type: 'object',
  title: 'Seksjon',
  titleEN: 'Section',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      titleEN: 'Title',
      description: 'Overstyr tittel fra målstien',
      descriptionEN: 'Override title from the target article',
      type: 'string',
    },
    {
      name: 'target',
      title: 'Mål',
      titleEN: 'Target',
      description: 'Dersom denne brukes blir tittelen en lenke',
      descriptionEN: 'If used the title becomes a link',
      type: 'reference',
      to: [{type: 'Route'}],
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    {
      name: 'links',
      title: 'Lenker',
      titleEN: 'Links',
      description: 'Lenker gruppert i denne seksjonen',
      descriptionEN: 'Links grouped in this section',
      type: 'array',
      of: [{type: 'TocLink'}],
      options: {
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
  ],
}
