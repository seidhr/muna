import React from 'react'
import { Link } from 'part:@sanity/base/router'
import EDTFInput from '../components/Input'
import edtf from 'edtf'

export default {
  name: 'Timespan',
  type: 'object',
  title: 'Tidsspenn',
  titleEN: 'Timespan',
  inputComponent: EDTFInput,
  fieldsets: [
    {
      name: 'begin',
      title: 'Beginning',
      options: {
        columns: 2
      }
    },
    {
      name: 'end',
      title: 'End',
      options: {
        columns: 2
      }
    }
  ],
  fields: [
    {
      name: 'edtf',
      title: 'EDTF',
      titleEN: 'EDTF',
      description: (<span>Write Extended Date/Time Format (EDTF) and easily save timespans like <strong>1880/1900-01</strong>. Exact dates er easy too, e.g. <strong>2020-01-01T12:12:12</strong>. Read about the <Link href="https://github.com/inukshuk/edtf.js">syntax</Link> and <Link href="https://www.loc.gov/standards/datetime/">specification</Link> for details.</span>),
      type: 'string',
      options: {
        semanticSanity: {
          "@type": "xsd:dateTime"
        }
      },
      validation: Rule => Rule.custom(value => {
        if (typeof value === 'undefined') {
          return true // Allow undefined values
        }
        try {
          const isValid = edtf(value, { types: ['Year', 'Date', 'Interval', 'Season'] }).isEDTF
          if (isValid) return true
        }
        catch (error) {
          return 'Must be valid EDTF format.'
        }
      })
    },
    {
      name: 'beginOfTheBegin',
      title: 'Begynnelsen av begynnelsen',
      titleEN: 'Begin of the begin',
      fieldset: 'begin',
      type: 'datetime',
      readOnly: true,
      options: {
        semanticSanity: {
          "@type": "xsd:date"
        }
      },
    },
    {
      name: 'endOfTheBegin',
      title: 'Slutten på begynnelsen',
      titleEN: 'End of the begin',
      fieldset: 'begin',
      type: 'datetime',
      readOnly: true,
      options: {
        semanticSanity: {
          "@type": "xsd:date"
        }
      },
    },
    {
      name: 'date',
      title: 'Dato',
      titleEN: 'Date',
      type: 'datetime',
      readOnly: true,
      options: {
        semanticSanity: {
          "@type": "xsd:dateTime"
        }
      },
    },
    {
      name: 'beginOfTheEnd',
      title: 'Begynnelsen av slutten',
      titleEN: 'Begin of the end',
      fieldset: 'end',
      type: 'datetime',
      readOnly: true,
      options: {
        semanticSanity: {
          "@type": "xsd:date"
        }
      },
    },
    {
      name: 'endOfTheEnd',
      title: 'Slutten av slutten',
      titleEN: 'End of the end',
      fieldset: 'end',
      type: 'datetime',
      readOnly: true,
      options: {
        semanticSanity: {
          "@type": "xsd:date"
        }
      },
    },
    /* TODO Swap to referredToBy
     */
    /* {
      name: 'referredToBy',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'LocaleBlock',
      options: {
        semanticSanity: {
          '@type': '@json'
        }
      },
    }, */
  ],
  preview: {
    select: {
      edtf: 'edtf'
      //blocks: 'description.nor',
    },
    prepare({ edtf }) {
      //const block = (blocks || []).find((block) => block._type === 'block')

      return {
        title: edtf,
        /* subtitle: block
          ? block.children
            .filter((child) => child._type === 'span')
            .map((span) => span.text)
            .join('')
          : '', */
      }
    },
  },
}
