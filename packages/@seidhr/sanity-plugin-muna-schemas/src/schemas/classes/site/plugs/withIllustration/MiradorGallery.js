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
      name: 'title',
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
      title: 'title',
      media: 'items.0.manifestRef.image',
      items: 'items'
    },
    prepare: ({ title, media, items }) => ({
      title: title,
      subtitle: `Mirador galleri, ${items?.length ?? '??'} dokument`,
      media: media ? media : ''
    }),
  },
}


