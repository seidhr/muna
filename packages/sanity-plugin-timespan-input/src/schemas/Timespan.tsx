import { ObjectDefinition, defineField, defineType } from 'sanity'
import { TimespanInput } from '../TimespanInput'
import edtf from 'edtf'

const timespanTypeName = 'Timespan' as const

/* *
 * @public
 */
export interface TimespanDefinition extends Omit<ObjectDefinition, 'type' | 'fields' | 'options'> {
  type: typeof timespanTypeName
}

declare module '@sanity/types' {
  // makes type: 'color' narrow correctly when using defineTyp/defineField/defineArrayMember
  export interface IntrinsicDefinitions {
    timespan: TimespanDefinition
  }
}

export const timespan = defineType({
  name: timespanTypeName,
  type: 'object',
  title: 'Tidsspenn',
  components: {
    input: TimespanInput,
  },
  fields: [
    defineField({
      name: 'edtf',
      title: 'EDTF',
      type: 'string',
      description: (
        <span>
          Write Extended Date/Time Format (EDTF) and easily save timespans like{' '}
          <strong>1880/1900-01</strong>. Exact dates are easy too, e.g.{' '}
          <strong>2020-01-01T12:12:12</strong>. Read about the{' '}
          <a href="https://github.com/inukshuk/edtf.js">syntax</a> and{' '}
          <a href="https://www.loc.gov/standards/datetime/">specification</a> for details.
        </span>
      ),
      // Custom validation
      validation: (Rule) =>
        Rule.custom((value) => {
          if (typeof value === 'undefined') {
            return true // Allow undefined values
          }
          try {
            const edtfValue = edtf(value)
            return edtfValue.isEDTF ? true : 'Invalid EDTF'
          } catch (error) {
            return 'Invalid EDTF'
          }
        }),
    }),
    defineField({
      name: 'beginOfTheBegin',
      title: 'Begynnelsen av begynnelsen',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'endOfTheBegin',
      title: 'Slutten på begynnelsen',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'date',
      title: 'Dato',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'beginOfTheEnd',
      title: 'Begynnelsen av slutten',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'endOfTheEnd',
      title: 'Slutten av slutten',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      timespanTitle: 'edtf',
    },
    prepare({ timespanTitle }: { timespanTitle: string }) {
      return {
        title: timespanTitle,
      }
    },
  },
})
