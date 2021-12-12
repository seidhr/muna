/* 
  Subclass of D1 Digital Object
*/

export default {
  name: 'DigitalImageObject',
  type: 'image',
  title: 'Image',
  options: {
    hotspot: true,
    metadata: ['exif', 'location', 'lqip', 'palette'],
    semanticSanity: {
      exclude: true
    }
  },
  fields: [
    {
      name: 'caption',
      title: 'Bildetekst',
      titleEN: 'Caption',
      type: 'LocaleString',
    },
    {
      name: 'alt',
      title: 'Alternative tekst',
      titleEN: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      type: 'LocaleString',
      validation: (Rule) => Rule.warning('You should to fill out the alternative text.'),
      options: {
        isHighlighted: true,
      },
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption',
    },
  },
}
