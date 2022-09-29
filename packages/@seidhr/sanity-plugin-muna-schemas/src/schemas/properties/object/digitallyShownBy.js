
export const digitallyShownBy = {
  name: 'digitallyShownBy',
  title: 'Digitale bilder',
  titleEN: 'Digital images',
  description: 'For objekt med flere bilder, blad, versjoner eller sider av objektet. Bruk "hovedrepresentasjon" til forhåndsvisning.',
  descriptionEN: 'For objects with multiple images of pages, versions or sides of the object. Use "main representation" for thumbnail.',
  fieldset: 'representation',
  type: 'array',
  of: [
    { type: 'image' },
  ],
  options: {
    hotspot: true,
    layout: 'grid',
    semanticSanity: {
      '@type': '@json'
    }
  }
};
