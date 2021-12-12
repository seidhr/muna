
export const carriedOutBy = {
  name: 'carriedOutBy',
  title: 'Utført av',
  titleEN: 'Carried out by',
  type: 'array',
  of: [{
    type: 'reference',
    to: [
      { type: 'Actor' },
    ]
  }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
