import { coalesceLabel, timespanAsString } from '../../helpers'
import { timespan, referredToBy, tookPlaceAt, featured } from '../../props'

var capitalize = require('capitalize')

export default {
  name: 'Joining',
  type: 'object',
  title: 'Innlemmelse',
  titleEN: 'Joining',
  fieldsets: [
    {
      name: 'minimum',
      title: 'Minimumsregistrering',
      options: { collapsible: true, collapsed: false },
    },
  ],
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
      name: 'joinedWith',
      title: 'Innlemmet i gruppe',
      titleEN: 'Joined with',
      description: 'Group that actor(s) joined with',
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
      name: 'joined',
      title: 'Innlemmet aktør(er)',
      titleEN: 'Joined',
      description: 'Actor(s) that joined this group',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'Actor' },
          ]
        }
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    referredToBy,
  ],
  preview: {
    select: {
      type: '_type',
      joinedWith: 'joinedWith.label',
      bb: 'timespan.0.beginOfTheBegin',
      eb: 'timespan.0.endOfTheBegin',
      date: 'timespan.0.date',
      be: 'timespan.0.beginOfTheEnd',
      ee: 'timespan.0.endOfTheEnd',
    },
    prepare(selection) {
      const { type, joinedWith, bb, eb, date, be, ee } = selection
      const timespan = timespanAsString(bb, eb, date, be, ee, 'nb')
      return {
        title: `${capitalize(type)}: ${joinedWith ? coalesceLabel(joinedWith) : ''}`,
        subtitle: `${timespan ? timespan : ''}`,
      }
    },
  },
}
