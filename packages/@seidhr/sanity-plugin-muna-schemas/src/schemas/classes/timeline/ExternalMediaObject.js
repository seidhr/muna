/*
  Used by the timeline.js
*/

export default {
  name: 'ExternalMediaObject',
  title: 'External media object',
  type: 'object',
  options: {
    hotspot: true,
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
      type: 'url',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'linkTarget',
      title: 'Lenkemål',
      titleEN: 'Link target',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      imageUrl: 'url',
      title: 'caption',
    },
  },
}
