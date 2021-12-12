import { carriedOutBy, timespan, tookPlaceAt, referredToBy, featured } from '../../props'
import { defaultFieldsets } from '../../fieldsets'
import { timespanAsString } from '../../helpers'

var capitalize = require('capitalize')

export default {
  name: 'Death',
  type: 'object',
  title: 'Død',
  titleEN: 'Death',
  fieldsets: defaultFieldsets,
  fields: [featured, carriedOutBy, timespan, tookPlaceAt, referredToBy],
  preview: {
    select: {
      bb: 'timespan.0.beginOfTheBegin',
      eb: 'timespan.0.endOfTheBegin',
      date: 'timespan.0.date',
      be: 'timespan.0.beginOfTheEnd',
      ee: 'timespan.0.endOfTheEnd',
      blocks: 'description',
      type: '_type',
    },
    prepare(selection) {
      const { type, bb, eb, date, be, ee } = selection
      const timespan = timespanAsString(bb, eb, date, be, ee, 'nb')
      return {
        title: `${capitalize(type)}`,
        subtitle: timespan,
      }
    },
  },
}
