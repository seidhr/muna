
export const transferredTitleTo = {
  name: 'transferredTitleTo',
  title: 'Overførte tittel til',
  titleEN: 'Transferred title to',
  description: '',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Actor' }
      ]
    }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
