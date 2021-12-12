import { FaBox } from 'react-icons/fa'
import {
  timespan,
  editorialState,
  accessState,
  referredToBy,
  tookPlaceAt,
  preferredIdentifier,
  identifiedBy,
} from '../props'
import { defaultFieldsets } from '../fieldsets'
import { coalesceLabel } from '../helpers'

export default {
  name: 'Storage',
  type: 'document',
  title: 'Storage',
  description: 'Storage is a subclass of place.',
  initialValue: {
    editorialState: 'published',
    accessState: 'secret',
  },
  icon: FaBox,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    preferredIdentifier,
    identifiedBy,
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'reference',
      to: [{ type: 'StorageType' }],
      validation: (Rule) => Rule.required(),
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    referredToBy,
    timespan,
    {
      name: 'location',
      title: 'Lokasjon',
      titleEN: 'Location',
      type: 'geopoint',
      options: {
        semanticSanity: {
          '@type': '@json'
        }
      },
    },
    tookPlaceAt,
    {
      name: 'consistsOf',
      title: 'Består av',
      titleEN: 'consistsOf',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'Storage' },
            { type: 'HumanMadeObject' },
            { type: 'Collection' }
          ],
        },
      ],
      options: {
        editModal: 'fullscreen',
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
  ],
  preview: {
    select: {
      id: 'preferredIdentifier',
      type: 'hasType.label',
    },
    prepare(selection) {
      const { id, type } = selection

      return {
        title: `${id ? id : ''}`,
        subtitle: coalesceLabel(type),
      }
    },
  },
}
