import { defineField } from 'sanity'

const licenseTypes = [
  {
    title: 'Public Domain Mark',
    value: 'https://creativecommons.org/publicdomain/mark/1.0/',
  },
  {
    title: 'CC0 1.0 - Public Domain Dedication',
    value: 'https://creativecommons.org/publicdomain/zero/1.0/',
  },
  {
    title: 'CC BY',
    value: 'https://creativecommons.org/licenses/by/4.0/',
  },
  {
    title: 'In copyright',
    value: 'https://rightsstatements.org/vocab/InC/1.0/',
  },
  {
    title: 'In copyright - non-commercial use permitted',
    value: 'https://rightsstatements.org/vocab/InC-NC/1.0/',
  },
  {
    title: 'Copyright not evaluated',
    value: 'https://rightsstatements.org/vocab/CNE/1.0/',
  },
  {
    title: 'Copyright undetermined',
    value: 'https://rightsstatements.org/vocab/UND/1.0/',
  },
]

/**
 * License
 * dct:license
 */

export const license = defineField({
  name: 'license',
  title: 'License',
  description: 'Choose the correct lisense or mark',
  type: 'string',
  options: {
    list: licenseTypes,
  },
  validation: (Rule) => Rule.required(),
})
