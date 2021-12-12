import { digitallyShownBy, label, represents, referredToBy } from '../..'
import { defaultFieldsets } from '../..'
import { coalesceLabel } from '../..'

export default {
  name: 'VisualObject',
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
