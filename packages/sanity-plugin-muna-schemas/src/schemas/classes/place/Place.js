import { RiMapPinLine } from 'react-icons/ri'
import { defaultFieldsets } from '../../../../lib/fieldsets/defaultFieldsets'
import { coalesceLabel } from '../../../helpers'
import { accessState, editorialState, label } from '../../properties/datatype'
import { definedByGeoJSON, identifiedBy, referredToBy } from '../../properties/object'
// import {KulturnavInput} from '../components/kulturnavInput/KulturnavInput'

export default {
  name: 'Place',
  type: 'document',
  title: 'Sted',
  initialValue: {
    editorialState: 'published',
    accessState: 'open',
  },
  icon: RiMapPinLine,
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
