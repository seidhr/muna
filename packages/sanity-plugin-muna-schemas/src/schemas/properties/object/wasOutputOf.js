import { defineField } from 'sanity'

export const wasOutputOf = defineField({
  name: 'wasOutputOf',
  title: 'Was output of',
  type: 'DataTransferEvent',
  hidden: true,
  options: {
    semanticSanity: {
      '@type': '@json',
    },
  },
})
