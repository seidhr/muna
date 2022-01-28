import { GiExplosiveMaterials } from 'react-icons/gi'
import { coalesceLabel } from '../../../../../helpers/coalesceLabel'
import { defaultFieldsets } from '../../../../../vocabularies/defaultVocabularies'
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
