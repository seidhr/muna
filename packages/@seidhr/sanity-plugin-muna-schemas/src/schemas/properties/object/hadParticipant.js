
export const hadParticipant = {
  name: 'hadParticipant',
  title: 'Hadde medvirkende',
  titleEN: 'Had participant',
  type: 'array',
  of: [{ type: 'ContributionAssignment' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
