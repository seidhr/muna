import { MdOutlineLocalMovies } from 'react-icons/md'
import { labelSingleton } from '../../properties/datatype'

export default {
  name: 'VideoBlock',
  type: 'object',
  title: 'Video',
  description: 'Embed video',
  icon: MdOutlineLocalMovies,
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
    labelSingleton,
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
