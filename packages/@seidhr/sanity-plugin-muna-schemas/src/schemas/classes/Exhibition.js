import { FaGlasses } from 'react-icons/fa'
import {
  editorialState,
  accessState,
  referredToBy,
  labelSingleton,
  identifiedBy,
  language,
  tookPlaceAt,
} from '../props'
import { defaultFieldsets } from '../fieldsets'
import { coalesceLabel } from '../helpers'

export default {
  name: 'Exhibition',
  title: 'Exhibition',
  type: 'document',
  initialValue: {
    editorialState: 'review',
    accessState: 'secret',
  },
  icon: FaGlasses,
  fieldsets: defaultFieldsets,
  options: {
    semanticSanity: {
      '@id': 'crm:E89_Propositional_Object'
    }
  },
  fields: [
    editorialState,
    accessState,
    labelSingleton,
    identifiedBy,
    referredToBy,
    language,
    {
      name: 'creator',
      title: 'Skaper',
      titleEN: 'Author',
      description:
        'Registrer en eller flere aktører som har skapt dette dokumentet, gjerne med hvilken rolle de hadde.',
      type: 'array',
      of: [
        {
          type: 'ContributionAssignment',
        },
      ],
      options: {
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description: 'Events and activities connected to this object',
      type: 'array',
      of: [
        { type: 'Creation' },
        { type: 'Move' }
      ],
      options: {
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
    tookPlaceAt,
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare(selection) {
      const { title } = selection

      return {
        title: coalesceLabel(title),
      }
    },
  },
}
