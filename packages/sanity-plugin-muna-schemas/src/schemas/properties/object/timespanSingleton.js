import { defineField } from 'sanity'

export const timespanSingleton = defineField({
  name: 'timespan',
  title: 'Timespan',
  type: 'Timespan',
  options: {
    editModal: 'fullscreen',
    semanticSanity: {
      '@type': '@id',
    },
  },
})
