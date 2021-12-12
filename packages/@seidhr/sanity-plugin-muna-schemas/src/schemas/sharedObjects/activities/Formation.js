import {timespan, tookPlaceAt, referredToBy, motivatedBy, featured} from '../../props'
import {defaultFieldsets} from '../../fieldsets'

var capitalize = require('capitalize')

// Implisit 'wasFormedBy' to parent actor

export default {
  name: 'Formation',
  type: 'object',
  title: 'Opprettelse',
  titleEN: 'Formation',
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
    {
      name: 'formedFrom',
      title: 'Opprettet fra',
      titleEN: 'Formed from',
      type: 'array',
      of: [
        {
          type: 'reference', 
          to: [
            {type: 'Actor'}
          ],
          options: {
            filter: '_type == "Actor" && references($id)',
            filterParams: {id: 'd4ad3e47-1498-4b95-9b7f-c25be386691a'}
          }
        }
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
      const {type} = selection
      return {
        title: `${capitalize(type)}`,
      }
    },
  },
}
