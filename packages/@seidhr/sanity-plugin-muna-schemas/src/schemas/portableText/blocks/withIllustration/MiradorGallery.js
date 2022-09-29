export default {
  name: 'MiradorGallery',
  type: 'object',
  title: 'Mirador galleri',
  titleEN: 'Mirador gallery',
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
      title: 'Vinduer',
      titleEN: 'Items',
      type: 'array',
      of: [{ type: 'MiradorGalleryWindow' }],
    },
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Heading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'simpleBlockContent',
    },
  ],
  preview: {
    select: {
      title: 'label',
      media: 'items.0.manifestRef.image',
      items: 'items'
    },

    prepare({ title, media, items }) {
      const count = items?.length ?? 'no'
      return {
        title: title ?? 'Missing title',
        subtitle: `Mirador galleri, ${count} document(s)`,
        media: media ? media : ''
      }
    }

  },
}


