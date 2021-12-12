export default {
  name: 'Iframe',
  type: 'object',
  title: 'iFrame',
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
      titleEN: 'Heading',
      type: 'string',
    },
    {
      name: 'url',
      title: 'url',
      description: 'Bruk selve nettadressen fra en iFrame. NB! Bruk med måte.',
      type: 'url',
    },
  ],
  
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare({title, url}) {
      return {
        title: title ? title : url,
        subtitle: 'iFrame',
      }
    },
  },
}
