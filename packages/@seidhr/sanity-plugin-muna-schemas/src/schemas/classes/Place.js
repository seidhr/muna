import { FaMapMarker } from 'react-icons/fa'
import {
  editorialState,
  accessState,
  label,
  referredToBy,
  identifiedBy,
  definedByGeoJSON,
} from '../props'
import { defaultFieldsets } from '../fieldsets'
import { coalesceLabel } from '../helpers'
// import {KulturnavInput} from '../components/kulturnavInput/KulturnavInput'

export default {
  name: 'Place',
  type: 'document',
  title: 'Sted',
  initialValue: {
    editorialState: 'published',
    accessState: 'open',
  },
  icon: FaMapMarker,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    label,
    identifiedBy,
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'PlaceType' }],
        },
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    /* {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'array',
      of: [{type: 'string'}],
      inputComponent: KulturnavInput,
    }, */
    referredToBy,
    definedByGeoJSON,
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
