import { FaTag } from 'react-icons/fa'
import { editorialState, accessState, label, altLabel, broader, domain } from '../../..'
import { defaultFieldsets } from '../../..'
import { coalesceLabel } from '../../..'

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
    editorialState,
    accessState,
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
