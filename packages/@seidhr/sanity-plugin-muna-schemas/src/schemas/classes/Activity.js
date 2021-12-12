import { timespanAsString, coalesceLabel } from '../helpers'
import { MdLocalActivity } from 'react-icons/md'
import {
  timespan,
  referredToBy,
  carriedOutBy,
  usedSpecificTechnique,
  usedGeneralTechnique,
  usedSpecificObject,
  tookPlaceAt,
  hadParticipant,
  usedObjectOfType,
  identifiedBy,
  labelSingleton,
  accessState,
  editorialState,
} from '../props'

export default {
  name: 'Activity',
  title: 'Activity',
  type: 'document',
  icon: MdLocalActivity,
  fieldsets: [
    {
      name: 'state',
      title: 'Status',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'minimum',
      title: 'Basic metadata',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'technique',
      title: 'Felt relatert til teknikk',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'purpose',
      title: 'Formål med aktiviteten',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    editorialState,
    accessState,
    labelSingleton,
    {
      ...identifiedBy,
      fieldset: 'minimum',
    },
    {
      ...referredToBy,
      fieldset: 'minimum',
    },
    {
      name: 'hasType',
      title: 'Aktivitetstype',
      titleEN: 'Activity type',
      type: 'array',
      fieldset: 'minimum',
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
    carriedOutBy,
    hadParticipant,
    {
      name: 'target',
      title: 'Mål',
      titleEN: 'Target',
      type: 'reference',
      to: [
        { type: 'Collection' },
        { type: 'Actor' }
      ],
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    timespan,
    tookPlaceAt,
    {
      name: 'consistsOf',
      title: 'Underaktiviteter',
      titleEN: 'Sub activities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'Activity' }] }],
      options: {
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
    {
      name: 'continued',
      title: 'Fortsatte',
      titleEN: 'Continued',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'Activity' }] }],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    {
      name: 'wasContinuedBy',
      title: 'Ble fortsatt av',
      titleEN: 'Was continued by',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'Activity' }] }],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    {
      name: 'influencedBy',
      title: 'Påvirket av',
      titleEN: 'Influenced by',
      description: '',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'HumanMadeObject' },
            { type: 'Event' },
            { type: 'Place' },
            { type: 'Work' },
            { type: 'Actor' }
          ],
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
      ...usedGeneralTechnique,
      fieldset: 'technique',
    },
    {
      ...usedSpecificTechnique,
      fieldset: 'technique',
    },
    {
      ...usedObjectOfType,
      fieldset: 'technique',
    },
    {
      ...usedSpecificObject,
      fieldset: 'technique',
    },
    {
      name: 'generalPurpose',
      title: 'Generelt formål',
      titleEN: 'General purpose',
      description: '',
      fieldset: 'purpose',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'Concept' }],
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
      name: 'motivatedBy',
      title: 'Motivert av',
      titleEN: 'Motivated by',
      description: '',
      fieldset: 'purpose',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'DesignOrProcedure' },
            { type: 'Event' },
            { type: 'Report' },
            { type: 'Acquisition' },
            { type: 'Exhibition' },
            { type: 'Project' },
          ],
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
      name: 'intendedUseOf',
      title: 'Forutså bruk av',
      titleEN: 'Intended use of',
      description: '',
      fieldset: 'purpose',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'HumanMadeObject' }] }],
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
      title: 'label',
      bb: 'timespan.0.beginOfTheBegin',
      eb: 'timespan.0.endOfTheBegin',
      date: 'timespan.0.date',
      be: 'timespan.0.beginOfTheEnd',
      ee: 'timespan.0.endOfTheEnd',
      type: 'hasType.0.label',
    },
    prepare(selection) {
      const { title, type, bb, eb, date, be, ee } = selection
      const timespan = timespanAsString(bb, eb, date, be, ee, 'nb')

      return {
        title: title,
        subtitle: `${coalesceLabel(type)} ${timespan}`,
      }
    },
  },
}
