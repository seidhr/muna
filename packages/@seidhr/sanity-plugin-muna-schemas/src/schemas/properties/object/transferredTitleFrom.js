
export const transferredTitleFrom = {
  name: 'transferredTitleFrom',
  title: 'Overførte tittel fra',
  titleEN: 'Transferred title from',
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
