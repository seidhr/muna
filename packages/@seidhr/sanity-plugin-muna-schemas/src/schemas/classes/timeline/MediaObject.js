export default {
  name: 'MediaObject',
  title: 'Media object',
  type: 'image',
  options: {
    hotspot: true,
    metadata: ['exif', 'location', 'lqip', 'palette'],
  },
  fields: [
    {
      name: 'url',
      title: 'Nettadresse',
      titleEN: 'Url',
      type: 'url',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'caption',
      title: 'Billedtekst',
      titleEN: 'Caption',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'credit',
      title: 'Kreditering',
      titleEN: 'Credit',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'alt',
      title: 'Alternative tekst',
      titleEN: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      type: 'string',
      options: {
        isHighlighted: true,
      },
      validation: (Rule) => Rule.error('You have to fill out the alternative text.').required(),
    },
    {
      name: 'link',
      title: 'Lenke',
      titleEN: 'Link',
      descriptionEN: 'Optional URL to use as the href for wrapping the media with an <a> tag.',
      type: 'url',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'linkTarget',
      title: 'Lenkemål',
      titleEN: 'Link target',
      descriptionEN: 'Optional target to be associated with link if used.',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption',
    },
  },
}
