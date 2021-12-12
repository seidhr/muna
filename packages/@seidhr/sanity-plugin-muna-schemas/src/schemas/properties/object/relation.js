
export const relation = {
  name: 'relation',
  title: 'Relasjon',
  titleEN: 'Relation',
  description: 'Uspesifisert relasjon til en annen ting',
  descriptionEN: 'Unspecified relation',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'HumanMadeObject' },
        { type: 'Actor' },
        { type: 'Event' },
        { type: 'Activity' },
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
