import { IoMdCreate } from 'react-icons/io'
import { featured } from '../../../properties/datatype'
import { contributionAssignedBy, timespanSingleton, tookPlaceAt } from '../../../properties/object'

export default {
  name: 'Creation',
  type: 'document',
  title: 'Skapelse',
  titleEN: 'Creation',
  icon: IoMdCreate,
  fields: [
    featured,
    contributionAssignedBy,
    timespanSingleton,
    tookPlaceAt
  ],
  preview: {
    select: {
      contributor: 'contributionAssignedBy.0.asignedActor.label',
      contributorName: 'contributionAssignedBy.0.usedName.content',
      bb: 'timespan.beginOfTheBegin',
      eb: 'timespan.endOfTheBegin',
      date: 'timespan.date',
      be: 'timespan.beginOfTheEnd',
      ee: 'timespan.endOfTheEnd',
    },
    prepare(selection) {
      const dayjs = require('dayjs')
      const _ = require('lodash')
      const localizedFormat = require('dayjs/plugin/localizedFormat')
      dayjs.extend(localizedFormat)
      require('dayjs/locale/nb')

      const { contributor, contributorName, bb, eb, date, be, ee } = selection
      const dates = _.pickBy({ bb: bb, eb: eb, date: date, be: be, ee: ee }, _.identity)

      const d = Object.assign(
        {},
        ...Object.keys(dates).map((k) => ({ [k]: dayjs(dates[k]).locale('nb').format('LL') })),
      )

      return {
        title: `Creation, by ${contributor || contributorName || 'unknown'}`,
        subtitle:
          `${d.date || ''}${d.bb || ''}${d.bb && d.eb ? '~' : ''}${d.eb || ''}` +
          `${(d.bb || d.eb) && (d.be || d.ee) ? ' / ' : ''}` +
          `${d.be || ''}${d.be && d.ee ? '~' : ''}${d.ee || ''}`,
      }
    },
  },
}
