import { defaultFieldsets } from '../fieldsets'
import { coalesceLabel } from '../helpers'

export default {
  name: 'GeojsonFeatureCollection',
  type: 'object',
  title: 'Feature Collection',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fieldsets: defaultFieldsets,
  fields: [
    // Foreign member not in the GeoJSON schema
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      description: '',
      descriptionEN: '',
      fieldset: 'minimum',
      type: 'LocaleString',
    },
    {
      name: 'features',
      title: 'Features',
      titleEN: 'Features',
      type: 'array',
      of: [{ type: 'GeojsonFeature' }],
    },
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare(selection) {
      const { title } = selection
      const label = coalesceLabel(title)

      return {
        title: label || 'GeoJSON Feature Collection',
      }
    },
  },
}
