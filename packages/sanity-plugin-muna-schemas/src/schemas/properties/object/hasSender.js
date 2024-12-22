import { defineField } from 'sanity'

export const hasSender = defineField({
  name: 'hasSender',
  title: 'Has sender',
  type: 'DigitalDevice',
  options: {
    semanticSanity: {
      '@type': '@json',
    },
  },
})
