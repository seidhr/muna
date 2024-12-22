import { defineField, defineType } from 'sanity'
import { coalesceLabel } from '../../../../'
import { referredToBy, timespanSingleton } from '../../../../schemas/properties/object'

export default defineType({
  name: 'Identifier',
  type: 'object',
  title: 'Identifikator',
  titleEN: 'Identifier',
  fields: [
    defineField({
      name: 'content',
      title: 'Identifikator',
      titleEN: 'Identifier',
      type: 'string',
    }),
    defineField({
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'reference',
      to: [{ type: 'IdentifierType' }],
      validation: (Rule) => Rule.required(),
      options: {
        semanticSanity: {
          '@type': '@id',
        },
      },
    }),
    timespanSingleton,
    referredToBy,
  ],
  preview: {
    select: {
      title: 'content',
      type: 'hasType.label',
    },
    prepare(selection) {
      const { title, type } = selection
      return {
        title: title,
        subtitle: coalesceLabel(type),
      }
    },
  },
})
