import { GiDeathSkull } from 'react-icons/gi'
import { defaultFieldsets, timespanAsString } from '../../../..'
import { featured } from '../../../properties/datatype'
import { carriedOutBy, referredToBy, timespanSingleton, tookPlaceAt } from '../../../properties/object'

const capitalize = require('capitalize')

export default {
  name: 'Death',
  type: 'document',
  title: 'Død',
  titleEN: 'Death',
  icon: GiDeathSkull,
  fieldsets: defaultFieldsets,
  fields: [featured, carriedOutBy, timespanSingleton, tookPlaceAt, referredToBy],
  preview: {
    select: {
      bb: 'timespan.beginOfTheBegin',
      eb: 'timespan.endOfTheBegin',
      date: 'timespan.date',
      be: 'timespan.beginOfTheEnd',
      ee: 'timespan.endOfTheEnd',
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
