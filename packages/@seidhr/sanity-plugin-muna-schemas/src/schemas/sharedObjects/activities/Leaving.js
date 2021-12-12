import { timespan, tookPlaceAt, referredToBy, featured } from '../../props'
import { defaultFieldsets } from '../../fieldsets'
import { coalesceLabel, timespanAsString } from '../../helpers'

var capitalize = require('capitalize')

export default {
  name: 'Leaving',
  type: 'object',
  title: 'Utmeldelse',
  titleEN: 'Leaving',
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
      bb: 'timespan.0.beginOfTheBegin',
      eb: 'timespan.0.endOfTheBegin',
      date: 'timespan.0.date',
      be: 'timespan.0.beginOfTheEnd',
      ee: 'timespan.0.endOfTheEnd',
    },
    prepare(selection) {
      const { type, separatedFrom, bb, eb, date, be, ee } = selection
      const timespan = timespanAsString(bb, eb, date, be, ee, 'nb')
      return {
        title: `${capitalize(type)} ${separatedFrom ? coalesceLabel(separatedFrom) : ''}`,
        subtitle: `${timespan ? timespan : ''}`,
      }
    },
  },
}
