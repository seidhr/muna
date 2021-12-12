
export const transferredTitleOf = {
  name: 'transferredTitleOf',
  title: 'Overførte tittel',
  titleEN: 'Transferred title of',
  description: '',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'HumanMadeObject' },
        { type: 'Collection' }
      ],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
