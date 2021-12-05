export default {
  name: 'Birth',
  title: 'Birth',
  type: 'object',
  fields: [
    {
      name: 'timespan',
      title: 'Timespan',
      type: 'Timespan',
      options: {
        semanticSanity: {
          exclude: true
        }
      }
    }
  ]
}