import { ObjectDefinition, defineField, defineType } from 'sanity'
import { TimespanInput } from '../TimespanInput'
import edtf from 'edtf'
import { StyledDescription } from './styles'

const timespanTypeName = 'Timespan' as const

/* *
 * @public
 */
export interface TimespanDefinition extends Omit<ObjectDefinition, 'type' | 'fields' | 'options'> {
  type: typeof timespanTypeName
}

declare module '@sanity/types' {
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
        <StyledDescription>
          <summary>Write EDTF dates, for example "0900/1200?". Click for explanation.</summary>
          <div>
            <div>
              Extended Date/Time Format (EDTF) is a way to write dates and times in a way that can
              express{' '}
              <a href="https://www.loc.gov/standards/datetime/background.html">
                uncertainty and approximations
              </a>
              .
            </div>
            <div>
              <ul>
                <li>
                  Intervals: <kbd>1880/1900-01</kbd>.
                </li>
                <li>
                  Unknown start: <kbd>/1900-01</kbd>.
                </li>
                <li>
                  Unknown end: <kbd>2021/</kbd>.
                </li>
                <li>
                  Uncertainty: <kbd>1900-01-12?</kbd>.
                </li>
                <li>
                  Approximation: <kbd>~1900</kbd>.
                </li>
                <li>
                  Exact dates: <kbd>2020-01-01T12:12:12</kbd>.
                </li>
              </ul>
              <div>
                Read about the <a href="https://github.com/inukshuk/edtf.js">syntax</a> and{' '}
                <a href="https://www.loc.gov/standards/datetime/">specification</a> for more
                details.
              </div>
            </div>
          </div>
        </StyledDescription>
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
