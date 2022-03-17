import { GiDeathSkull } from 'react-icons/gi'
import { defaultFieldsets, timespanAsString } from '../../../..'
import { featured } from '../../../properties/datatype'
import { carriedOutBy, referredToBy, timespan, tookPlaceAt } from '../../../properties/object'

const capitalize = require('capitalize')

export default {
  name: 'Death',
  type: 'document',
  title: 'Død',
  titleEN: 'Death',
  icon: GiDeathSkull,
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
      const timespanString = timespanAsString(bb, eb, date, be, ee, 'nb')
      return {
        title: `${capitalize(type)}`,
        subtitle: timespanString,
      }
    },
  },
}