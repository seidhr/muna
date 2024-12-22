import { defineField } from 'sanity'

export const definition = defineField({
  name: 'definition',
  title: 'Definition',
  description: 'A short definition of this concept.',
  type: 'LocaleBlockSimple',
})
