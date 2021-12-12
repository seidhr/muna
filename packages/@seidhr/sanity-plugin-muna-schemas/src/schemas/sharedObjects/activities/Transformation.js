import {timespan, carriedOutBy, tookPlaceAt, referredToBy, featured} from '../../props'
import {defaultFieldsets} from '../../fieldsets'

export default {
  name: 'Transformation',
  type: 'object',
  title: 'Transformasjon',
  titleEN: 'Transformation',
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
          to: [{type: 'EventType'}],
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
      const {date} = selection
      return {
        title: `Transformasjon${date ? ', datert ' + date : ''}`,
      }
    },
  },
}
