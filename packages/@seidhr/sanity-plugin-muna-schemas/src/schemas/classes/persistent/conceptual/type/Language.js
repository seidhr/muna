import { FaLanguage } from 'react-icons/fa'
import { coalesceLabel } from '../../../../../helpers/coalesceLabel'
import { defaultFieldsets } from '../../../../../vocabularies/defaultVocabularies'
import { altLabel, label } from '../../../../properties/datatype'

export default {
  name: 'Language',
  title: 'Language',
  type: 'document',
  icon: FaLanguage,
  fieldsets: defaultFieldsets,
  fields: [
    {
      name: 'identifiedByISO6393',
      title: 'Identifisert av ISO 639‑3 kode',
      type: 'string',
    },
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
