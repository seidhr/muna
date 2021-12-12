import { referredToBy, timespan } from '../props'
import { defaultFieldsets } from '../fieldsets'
import { coalesceLabel } from '../helpers'

export default {
  name: 'Identifier',
  type: 'object',
  title: 'Identifikator',
  titleEN: 'Identifier',
  fieldsets: defaultFieldsets,
  fields: [
    {
      name: 'content',
      title: 'Identifikator',
      titleEN: 'Identifier',
      type: 'string',
    },
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'reference',
      to: [{ type: 'IdentifierType' }],
      validation: (Rule) => Rule.required(),
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    timespan,
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
}
