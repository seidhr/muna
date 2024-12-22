import { defineField } from 'sanity'

export const editorialState = defineField({
  name: 'editorialState',
  title: 'State',
  type: 'string',
  fieldset: 'state',
  initialValue: 'published',
  options: {
    list: [
      { title: 'Til gjennomgang', value: 'review' },
      { title: 'Publisert', value: 'published' },
    ],
    layout: 'radio',
    direction: 'vertical',
  },
})
