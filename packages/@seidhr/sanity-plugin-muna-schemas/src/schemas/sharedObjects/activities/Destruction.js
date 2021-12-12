import {timespan, carriedOutBy, tookPlaceAt, featured} from '../../props'

export default {
  name: 'Destruction',
  type: 'object',
  title: 'Ødeleggelse',
  titleEN: 'Destruction',
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
  ],
  preview: {
    select: {
      date: 'productionDate',
    },
    prepare(selection) {
      const {date} = selection
      return {
        title: `Ending${date ? ', dated ' + date : ''}`,
      }
    },
  },
}
