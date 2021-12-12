import { FaLanguage } from 'react-icons/fa'
import { label, altLabel } from '../../props'
import { defaultFieldsets } from '../../fieldsets'
import { coalesceLabel } from '../../helpers'

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
