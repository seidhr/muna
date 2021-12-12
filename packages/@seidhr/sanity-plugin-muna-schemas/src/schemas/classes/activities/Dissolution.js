import { timespan, tookPlaceAt, referredToBy, motivatedBy, featured } from '../../..'
import { defaultFieldsets } from '../../..'

var capitalize = require('capitalize')

// Implisit 'wasFormedBy' to parent Actor

export default {
  name: 'Dissolution',
  type: 'document',
  title: 'Oppløsing',
  titleEN: 'Dissolution',
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
    timespan,
    tookPlaceAt,
    motivatedBy,
    referredToBy,
  ],
  preview: {
    select: {
      type: '_type',
    },
    prepare(selection) {
      const { type } = selection
      return {
        title: `${capitalize(type)}`,
      }
    },
  },
}
