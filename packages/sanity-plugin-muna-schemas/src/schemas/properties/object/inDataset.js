import { defineField } from 'sanity'

export const inDataset = defineField({
  name: 'inDataset',
  title: 'In dataset',
  type: 'Dataset',
  options: {
    semanticSanity: {
      '@type': '@id',
    },
  },
})
