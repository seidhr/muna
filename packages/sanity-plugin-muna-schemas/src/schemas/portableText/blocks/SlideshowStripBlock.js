export default {
  name: 'SlideshowStripBlock',
  type: 'object',
  title: 'Slideshow-strip',
  titleEN: 'Slideshow strip',
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
      of: [{ type: 'HumanMadeObject' }],
    },
    {
      name: 'heading',
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
      title: 'heading',
    },
    prepare: ({ title }) => ({
      title: title,
      subtitle: `Slideshow stripe`,
    }),
  },
}
