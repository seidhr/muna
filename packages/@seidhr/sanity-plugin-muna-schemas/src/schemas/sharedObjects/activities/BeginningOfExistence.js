import { now } from 'lodash'
import { coalesceLabel, timespanAsString } from '../../helpers'
import { timespan, tookPlaceAt, contributionAssignedBy, featured } from '../../props'

export default {
  name: 'BeginningOfExistence',
  type: 'object',
  title: 'Start på eksistens',
  titleEN: 'Beginning of existence',
  fields: [
    featured,
    contributionAssignedBy,
    timespan,
    tookPlaceAt
  ],
  preview: {
    select: {
      contributor: 'contributionAssignedBy.0.assignedActor.label',
      contributorName: 'contributionAssignedBy.0.usedName.content',
      bb: 'timespan.0.beginOfTheBegin',
      eb: 'timespan.0.endOfTheBegin',
      date: 'timespan.0.date',
      be: 'timespan.0.beginOfTheEnd',
      ee: 'timespan.0.endOfTheEnd',
    },
    prepare(selection) {
      const { contributor, contributorName, bb, eb, date, be, ee } = selection

      return {
        title: `Beginning of existence, by ${coalesceLabel(contributor) || contributorName || 'unknown'}`,
        subtitle: timespanAsString(bb, eb, date, be, ee, now)
      }
    },
  },
}
