import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'Dimension',
  type: 'object',
  title: 'Dimension',
  fields: [
    defineField({
      name: 'hasType',
      title: 'Classified as',
      type: 'reference',
      to: [{ type: 'DimensionType' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'number',
    }),
    defineField({
      name: 'hasUnit',
      title: 'Measurement unit',
      description: 'WIP, should use API',
      type: 'reference',
      to: [{ type: 'MeasurementUnit' }],
      validation: (Rule) => Rule.required(),
      initialValue: {
        _ref: '8bc9bc96-75d8-444e-80d6-b5b70b990104', // cm
      },
    }),
  ],
})
