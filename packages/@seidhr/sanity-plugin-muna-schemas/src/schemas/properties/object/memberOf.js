export const memberOf = {
  name: 'memberOf',
  title: 'Medlem av',
  titleEN: 'Member of',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Actor' }
      ],
      options: {
        filter: '_type == "Actor" && references($id)',
        filterParams: { id: 'd4ad3e47-1498-4b95-9b7f-c25be386691a' }
      }
    }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
