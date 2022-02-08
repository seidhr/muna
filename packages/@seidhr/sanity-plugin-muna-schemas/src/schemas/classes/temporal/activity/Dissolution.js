import { GiLightningDissipation } from 'react-icons/gi'
import { defaultFieldsets } from '../../../..'
import { featured } from '../../../properties/datatype'
import { motivatedBy, referredToBy, timespan, tookPlaceAt } from '../../../properties/object'

const capitalize = require('capitalize')

// Implisit 'wasFormedBy' to parent Actor

export default {
  name: 'Dissolution',
  type: 'document',
  title: 'Oppløsing',
  titleEN: 'Dissolution',
  icon: GiLightningDissipation,
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
