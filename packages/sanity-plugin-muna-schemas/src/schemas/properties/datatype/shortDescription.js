
export const shortDescription = {
  name: 'shortDescription',
  title: 'Kort beskrivelse',
  titleEN: 'Short description',
  description: 'En setning som beskriver denne tingen. For eksempel en persons livsrolle, virkested og leveår.',
  type: 'string',
  validation: (Rule) => Rule.max(100).warning('Korte og konsise beskrivelser er best!'),
};
