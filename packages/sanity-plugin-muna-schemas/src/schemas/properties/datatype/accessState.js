import { defineField } from 'sanity'

export const accessState = defineField({
  name: 'accessState',
  title: 'Access state',
  type: 'string',
  fieldset: 'state',
  initialValue: 'open',
  options: {
    list: [
      { title: 'Privat', value: 'secret' },
      { title: 'Open', value: 'open' },
    ],
    layout: 'radio',
    direction: 'vertical',
  },
})
