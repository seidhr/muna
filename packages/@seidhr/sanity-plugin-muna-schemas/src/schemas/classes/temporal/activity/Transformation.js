import { GiTransform } from 'react-icons/gi'
import { defaultFieldsets } from '../../../../helpers'
import { featured } from '../../../properties/datatype'
import { carriedOutBy, referredToBy, timespan, tookPlaceAt } from '../../../properties/object'

export default {
  name: 'Transformation',
  type: 'document',
  title: 'Transformasjon',
  titleEN: 'Transformation',
  icon: GiTransform,
  fieldsets: defaultFieldsets,
  fields: [
    featured,
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'EventType' }],
        },
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    carriedOutBy,
    timespan,
    tookPlaceAt,
    referredToBy,
  ],
  preview: {
    select: {
      date: 'timespan',
    },
    prepare(selection) {
      const { date } = selection
      return {
        title: `Transformasjon${date ? `, datert ${date}` : ''}`,
      }
    },
  },
}
