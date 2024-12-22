import { defineField } from 'sanity'

export const definedByGeoJSON = defineField({
  name: 'definedByGeoJSON',
  title: 'GeoJSON',
  description: 'Make a GeoJSON object or paste a GeoJSON file.',
  type: 'array',
  of: [{ type: 'GeojsonFeatureCollection' }, { type: 'Geojson' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
