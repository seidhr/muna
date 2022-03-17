export default {
  name: 'Gallery',
  type: 'object',
  title: 'Galleri',
  titleEN: 'Gallery',
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
      of: [{ type: 'ItemView' }],
    },
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Heading',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'label',
      media: 'items.0.image',
      items: 'items'
    },
    prepare: ({ title, media, items }) => ({
      title: title ?? 'Galleri uten tittel',
      subtitle: `Galleri, ${items?.length ?? '??'} dokument`,
      media: media ? media : ''
    }),
  },
}
