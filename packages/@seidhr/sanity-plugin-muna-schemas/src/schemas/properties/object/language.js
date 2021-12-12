
export const language = {
  name: 'language',
  title: 'Språk',
  titleEN: 'Language',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'Language' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
