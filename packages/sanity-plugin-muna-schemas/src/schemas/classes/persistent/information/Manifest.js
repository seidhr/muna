export default {
  name: 'Manifest',
  type: 'object',
  title: 'IIIF Manifest',
  titleEN: 'IIIF Manifest',
  fields: [
    {
      name: 'url',
      title: 'Manifest URL',
      titleEN: 'Manifest URL',
      type: 'url',
    },
  ],
  preview: {
    select: {
      name: 'url',
    },
    prepare(selection) {
      const {url} = selection
      return {
        title: `${url}`,
      }
    },
  },
}
