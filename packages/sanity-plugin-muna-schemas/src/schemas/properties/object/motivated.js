import { defineField } from 'sanity'

export const motivated = defineField({
  name: 'motivated',
  title: 'Motivated',
  type: 'array',
  of: [{ type: 'Treatment' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
