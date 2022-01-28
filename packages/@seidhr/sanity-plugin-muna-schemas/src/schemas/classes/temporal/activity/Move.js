import { FaTruckLoading } from 'react-icons/fa'
import { defaultFieldsets } from '../../../../fieldsets/defaultFieldsets'
import { accessState, editorialState, label } from '../../../properties/datatype'
import {
  carriedOutBy, motivatedBy, referredToBy, timespan, tookPlaceAt
} from '../../../properties/object'

const capitalize = require('capitalize')

export default {
  name: 'Move',
  title: 'Move',
  type: 'document',
  initialValue: {
    editorialState: 'review',
    accessState: 'secret',
  },
  icon: FaTruckLoading,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    label,
    carriedOutBy,
    timespan,
    tookPlaceAt,
    referredToBy,
    {
      name: 'moved',
      title: 'Flyttet',
      titleEN: 'Moved',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'HumanMadeObject' },
            { type: 'Exhibition' },
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
      name: 'movedFrom',
      title: 'Flyttet fra',
      titleEN: 'Moved from',
      type: 'reference',
      to: [
        { type: 'Place' },
        { type: 'Storage' }
      ],
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    {
      name: 'movedTo',
      title: 'Flyttet til',
      titleEN: 'Moved to',
      type: 'reference',
      to: [
        { type: 'Place' },
        { type: 'Storage' }
      ],
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    motivatedBy,
  ],
  preview: {
    select: {
      type: '_type',
      published: 'accessState',
    },
    prepare(selection) {
      const { type, published } = selection
      const secret = published === 'secret' ? '🔒' : ''

      return {
        title: `${capitalize(type)}`,
        subtitle: secret,
      }
    },
  },
}
