import { label } from '../../properties/datatype'

export default {
  name: 'VideoBlock',
  type: 'object',
  title: 'Video',
  description: 'Embed video',
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
    label,
    {
      name: 'url',
      title: 'url',
      type: 'url',
    },

  ],
  preview: {
    select: {
      title: 'label',
      url: 'url',
    },
    prepare({ title, url }) {
      return {
        title: title,
        subtitle: `Video: ${url}`,
      }
    }
  },
}
