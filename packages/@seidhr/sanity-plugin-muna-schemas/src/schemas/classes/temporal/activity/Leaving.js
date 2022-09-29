import { GiExitDoor } from 'react-icons/gi'
import { coalesceLabel, defaultFieldsets, timespanAsString } from '../../../..'
import { featured } from '../../../properties/datatype'
import { referredToBy, timespanSingleton, tookPlaceAt } from '../../../properties/object'

const capitalize = require('capitalize')

export default {
  name: 'Leaving',
  type: 'document',
  title: 'Utmeldelse',
  titleEN: 'Leaving',
  icon: GiExitDoor,
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
    timespanSingleton,
    tookPlaceAt,
    {
      name: 'separatedFrom',
      title: 'Forlot',
      titleEN: 'Left',
      description: 'Actor(s) that left this group',
      type: 'reference',
      to: [
        { type: 'Actor' }
      ],
      options: {
        filter: '_type == "Actor" && references($id)',
        filterParams: { id: 'd4ad3e47-1498-4b95-9b7f-c25be386691a' },
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      }
    },
    {
      name: 'separated',
      title: 'Forlot',
      titleEN: 'Left',
      description: 'Actor(s) that left this group',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'Actor' }
          ],
          options: {
            filter: '_type == "Actor" && references($id)',
            filterParams: { id: 'd4ad3e47-1498-4b95-9b7f-c25be386691a' },
          }
        }
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      }
    },
    referredToBy,
  ],
  preview: {
    select: {
      type: '_type',
      separatedFrom: 'separatedFrom.label',
      bb: 'timespan.beginOfTheBegin',
      eb: 'timespan.endOfTheBegin',
      date: 'timespan.date',
      be: 'timespan.beginOfTheEnd',
      ee: 'timespan.endOfTheEnd',
    },
    prepare(selection) {
      const { type, separatedFrom, bb, eb, date, be, ee } = selection
      const timespanString = timespanAsString(bb, eb, date, be, ee, 'nb')
      return {
        title: `${capitalize(type)} ${separatedFrom ? coalesceLabel(separatedFrom) : ''}`,
        subtitle: `${timespanString ? timespanString : ''}`,
      }
    },
  },
}
