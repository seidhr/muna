import { defaultFieldsets } from '../../../../fieldsets/defaultFieldsets'
import { coalesceLabel } from '../../../../helpers/coalesceLabel'
import { label } from '../../../properties/datatype'
import { digitallyShownBy, referredToBy, represents } from '../../../properties/object'

export default {
  name: 'VisualObject',
  description: 'Image content worthy of description as distinct entities, such as the image shown by a painting or drawing.',
  type: 'object',
  title: 'Visuelt objekt',
  titleEN: 'Visual object',
  fieldsets: defaultFieldsets,
  fields: [represents, label, digitallyShownBy, referredToBy],
  preview: {
    select: {
      title: 'label',
      media: 'digitallyShownBy.0',
    },
    prepare(selection) {
      const { title, media } = selection

      return {
        title: coalesceLabel(title),
        media: media,
      }
    },
  },
}
