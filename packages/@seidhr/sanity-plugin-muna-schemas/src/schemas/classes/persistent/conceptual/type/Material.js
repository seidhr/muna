import { GiExplosiveMaterials } from 'react-icons/gi'
import { defaultFieldsets } from '../../../../../fieldsets/defaultFieldsets'
import { coalesceLabel } from '../../../../../helpers/coalesceLabel'
import { altLabel, label } from '../../../../properties/datatype'

export default {
  name: 'Material',
  title: 'Material',
  type: 'document',
  icon: GiExplosiveMaterials,
  fieldsets: defaultFieldsets,
  fields: [label, altLabel],
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
