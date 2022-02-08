import { MdLocalActivity } from 'react-icons/md'
import { coalesceLabel } from '../../../../helpers/coalesceLabel'
import {
  accessState, editorialState, labelSingleton
} from '../../../properties/datatype'
import {
  carriedOutBy, hadParticipant, identifiedBy, referredToBy, timespan, tookPlaceAt, usedGeneralTechnique, usedObjectOfType, usedSpecificObject, usedSpecificTechnique
} from '../../../properties/object'

export default {
  name: 'Activity',
  title: 'Activity',
  type: 'document',
  icon: MdLocalActivity,
  fieldsets: [
    {
      name: 'state',
      title: 'Status',
      options: { collapsible: true, collapsed: false, columns: 2 },
    },
    {
      name: 'core',
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
  groups: [
    {
      name: 'technique',
      title: 'Teknikk'
    },
    {
      name: 'purpose',
      title: 'Formål'
    }
  ],
  fields: [
    {
      name: 'hasType',
      title: 'Aktivitetstype',
      titleEN: 'Activity type',
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
    labelSingleton,
    editorialState,
    accessState,
    identifiedBy,
    referredToBy,
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
      group: 'technique',
    },
    {
      ...usedSpecificTechnique,
      fieldset: 'technique',
      group: 'technique',
    },
    {
      ...usedObjectOfType,
      fieldset: 'technique',
      group: 'technique',
    },
    {
      ...usedSpecificObject,
      fieldset: 'technique',
      group: 'technique',
    },
    {
      name: 'generalPurpose',
      title: 'Generelt formål',
      titleEN: 'General purpose',
      description: '',
      fieldset: 'purpose',
      group: 'purpose',
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
      group: 'purpose',
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
      group: 'purpose',
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
      edtf: 'timespan.edtf',
      type: 'hasType.0.label',
    },
    prepare(selection) {
      const { title, type, edtf } = selection


      return {
        title: title,
        subtitle: `${coalesceLabel(type)} ${edtf ?? ''}`,
      }
    },
  },
}
