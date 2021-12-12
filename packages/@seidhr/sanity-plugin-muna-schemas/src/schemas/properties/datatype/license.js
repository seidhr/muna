import { licenseTypes } from '../vocabularies/defaultVocabularies';

/**
 * License
 * dct:license
 */

export const license = {
  name: 'license',
  title: 'Lisensiering',
  titleEN: 'License',
  description: 'Velg den korrekt lisensen eller rettighetserklæringen.',
  descriptionEN: 'Choose the correct lisense or mark',
  type: 'string',
  options: {
    list: licenseTypes,
  },
  validation: (Rule) => Rule.required(),
};
