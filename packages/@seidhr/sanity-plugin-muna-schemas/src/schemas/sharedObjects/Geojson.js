import {label, referredToBy} from '../props'
import {defaultFieldsets} from '../fieldsets'

export default {
  name: 'Geojson',
  type: 'object',
  title: 'geoJSON',
  titleEN: 'geoJSON',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fieldsets: defaultFieldsets,
  fields: [
    label,
    referredToBy,
    {
      name: 'data',
      title: 'Data',
      titleEN: 'Data',
      description:
        'Besøk geojson.io/ og konstruér din geoJSON. Lag punkt, linjer, rekangler eller polygon for å fortelle din historie.',
      type: 'code',
      options: {
        language: 'json',
        theme: 'monokai',
      },
    },
  ],
  preview: {
    select: {
      type: 'type',
    },
    prepare(selection) {
      const {type} = selection
      return {
        title: type,
      }
    },
  },
}
