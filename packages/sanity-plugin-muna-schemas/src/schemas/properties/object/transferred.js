import { defineField } from 'sanity'

export const transferred = defineField({
  name: 'transferred',
  title: 'Transferred',
  type: 'DigitalObject',
  options: {
    semanticSanity: {
      '@type': '@json',
    },
  },
})
