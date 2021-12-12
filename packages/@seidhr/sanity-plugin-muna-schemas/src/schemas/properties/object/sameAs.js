
export const sameAs = {
  name: 'sameAs',
  title: 'Samme som',
  titleEN: 'Same as',
  type: 'array',
  of: [{ type: 'url' }],
  options: {
    semanticSanity: {
      '@id': 'http://www.w3.org/2002/07/owl#sameAs',
      '@container': '@set',
      '@type': '@id'
    }
  },
};
