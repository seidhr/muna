import { coalesceLabel } from '../../../helpers/coalesceLabel'

export default {
  name: 'Dimension',
  type: 'object',
  title: 'Dimensjon',
  titleEN: 'Dimension',
  fields: [
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'reference',
      to: [{ type: 'DimensionType' }],
      validation: (Rule) => Rule.required(),
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    {
      name: 'value',
      title: 'Verdi',
      titleEN: 'Value',
      type: 'number',
      options: {
        semanticSanity: {
          "@type": "xsd:number"
        }
      },
    },
    {
      name: 'hasUnit',
      title: 'Måleenhet',
      titleEN: 'Measurement unit',
      description: 'WIP, should use API',
      type: 'reference',
      to: [{ type: 'MeasurementUnit' }],
      validation: (Rule) => Rule.required(),
      initialValue: {
        _ref: '8bc9bc96-75d8-444e-80d6-b5b70b990104' // cm
      }
    },
  ],
  preview: {
    select: {
      type: 'hasType.label',
      value: 'value',
      unit: 'hasUnit.label',
    },
    prepare(selection) {
      const { type, value, unit } = selection
      return {
        title: `${coalesceLabel(type)}: ${value || ''} ${coalesceLabel(unit) || ''}`,
      }
    },
  },
}
