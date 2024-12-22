import { defineField } from 'sanity'

export const language = defineField({
  name: 'language',
  title: 'Language',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'Language' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
