import { FaImage } from 'react-icons/fa'
import { coalesceLabel } from '../helpers'

export default {
  name: 'VisualItem',
  type: 'document',
  title: 'Visual object',
  icon: FaImage,
  fields: [
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'LocaleString',
      validation: (Rule) => Rule.required(),
      options: {
        semanticSanity: {
          '@container': '@language',
        }
      },
    },
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description: 'Events and activities connected to this object',
      type: 'array',
      of: [{ type: 'Creation' }],
      options: {
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare(selection) {
      const { title } = selection

      return {
        title: coalesceLabel(title),
      }
    },
  },
}
