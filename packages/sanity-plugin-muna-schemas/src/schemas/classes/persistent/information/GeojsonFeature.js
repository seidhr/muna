export default {
  name: 'GeojsonFeature',
  type: 'object',
  title: 'Feature',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fields: [
    {
      name: 'geometry',
      title: 'Geometri',
      titleEN: 'Geometry',
      type: 'GeojsonPoint',
    },
    {
      name: 'properties',
      title: 'Egenskaper',
      titleEN: 'Propterties',
      type: 'GeojsonProperties',
    },
  ],
  preview: {
    select: {
      type: 'properties.type',
    },
    prepare(selection) {
      const {type} = selection
      return {
        title: type || 'Point',
      }
    },
  },
}
