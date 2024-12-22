export default {
  name: 'GeojsonPoint',
  type: 'object',
  title: 'Point',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fields: [
    {
      name: 'coordinates',
      title: 'Koordinater',
      titleEN: 'Coordinates',
      type: 'geopoint',
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
