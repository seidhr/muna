import { defineField } from 'sanity'

export const digitallyShownBy = defineField({
  name: 'digitallyShownBy',
  title: 'Digital images',
  description:
    'For objects with multiple images of pages, versions or sides of the object. Use "main representation" for thumbnail.',
  fieldset: 'representation',
  type: 'array',
  of: [{ type: 'image' }],
  options: {
    hotspot: true,
    layout: 'grid',
    semanticSanity: {
      '@type': '@json',
    },
  },
})
