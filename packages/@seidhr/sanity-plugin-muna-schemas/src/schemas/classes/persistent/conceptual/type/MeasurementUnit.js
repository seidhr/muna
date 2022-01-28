import { FaTag } from 'react-icons/fa'
import { coalesceLabel } from '../../../../../helpers/coalesceLabel'
import { defaultFieldsets } from '../../../../../vocabularies/defaultVocabularies'
import { altLabel, label } from '../../../../properties/datatype'

export default {
  name: 'MeasurementUnit',
  title: 'Måleenhet',
  type: 'document',
  initialValue: {
    editorialState: 'published',
    accessState: 'open',
  },
  icon: FaTag,
  fieldsets: defaultFieldsets,
  fields: [
    label,
    altLabel,
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
