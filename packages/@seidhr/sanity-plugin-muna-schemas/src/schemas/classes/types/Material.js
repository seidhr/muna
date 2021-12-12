import { GiExplosiveMaterials } from 'react-icons/gi'
import { label, altLabel } from '../../props'
import { defaultFieldsets } from '../../fieldsets'
import { coalesceLabel } from '../../helpers'

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
