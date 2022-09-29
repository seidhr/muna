export const assignedActor = {
  name: 'assignedActor',
  title: 'Aktør',
  titleEN: 'Actor',
  type: 'reference',
  to: [
    { type: 'Actor' },
  ],
  options: {
    semanticSanity: {
      '@type': '@id'
    }
  },
};