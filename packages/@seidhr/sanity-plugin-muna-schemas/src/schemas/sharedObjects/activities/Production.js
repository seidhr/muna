import {
  timespan,
  contributionAssignedBy,
  tookPlaceAt,
  referredToBy,
  usedGeneralTechnique,
  usedSpecificTechnique,
  featured,
} from '../../props'
import { defaultFieldsets } from '../../fieldsets'
import { timespanAsString } from '../../helpers'

var capitalize = require('capitalize')

export default {
  name: 'Production',
  type: 'object',
  title: 'Production',
  titleEN: 'Produksjon',
  fieldsets: defaultFieldsets,
  fields: [
    featured,
    {
      name: 'consistsOf',
      title: 'Underaktiviteter',
      titleEN: 'Sub activities',
      type: 'array',
      of: [{ type: 'Production' }],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'ActivityType' }],
        },
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    contributionAssignedBy,
    timespan,
    tookPlaceAt,
    referredToBy,
    {
      name: 'hasModified',
      title: 'Har modifisert',
      titleEN: 'Has modified',
      description: 'A production can modify an existing object',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'HumanMadeObject' }] }],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    usedGeneralTechnique,
    usedSpecificTechnique,
    {
      name: 'employed',
      title: 'Benyttet',
      titleEN: 'Employed',
      description: 'WIP, could be a API call to some source of authorities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'Material' }] }],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
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
      type: '_type',
    },
    prepare(selection) {
      const { type, contributor, contributorName, bb, eb, date, be, ee } = selection
      const timespan = timespanAsString(bb, eb, date, be, ee, 'nb')

      return {
        title: `${capitalize(type)}, by ${contributor || contributorName || 'unknown'}`,
        subtitle: timespan,
      }
    },
  },
}
