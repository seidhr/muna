import EDTFInput from '../EDTFInput'

export default {
  name: 'Timespan',
  type: 'object',
  title: 'Tidsspenn',
  titleEN: 'Timespan',
  fields: [
    {
      name: 'beginOfTheBegin',
      title: 'Begynnelsen av begynnelsen',
      titleEN: 'Begin of the begin',
      fieldset: 'beginning',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today',
        semanticSanity: {
          "@type": "xsd:date"
        }
      },
    },
    {
      name: 'endOfTheBegin',
      title: 'Slutten på begynnelsen',
      titleEN: 'End of the begin',
      fieldset: 'beginning',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today',
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
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today',
        semanticSanity: {
          "@type": "xsd:dateTime"
        }
      },
    },
    {
      name: 'beginOfTheEnd',
      title: 'Begynnelsen av slutten',
      titleEN: 'Begin of the end',
      fieldset: 'ending',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today',
        semanticSanity: {
          "@type": "xsd:date"
        }
      },
    },
    {
      name: 'endOfTheEnd',
      title: 'Slutten av slutten',
      titleEN: 'End of the end',
      fieldset: 'ending',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today',
        semanticSanity: {
          "@type": "xsd:date"
        }
      },
    },
    /* TODO Swap to referredToBy
     */
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'LocaleBlock',
      options: {
        semanticSanity: {
          '@type': '@json'
        }
      },
    },
  ],
  inputComponent: EDTFInput,
  /* preview: {
    select: {
      bb: 'beginOfTheBegin',
      eb: 'endOfTheBegin',
      date: 'date',
      be: 'beginOfTheEnd',
      ee: 'endOfTheEnd',
      blocks: 'description.nor',
    },
    prepare(selection) {
      const { bb, eb, date, be, ee, blocks } = selection
      const block = (blocks || []).find((block) => block._type === 'block')
      const timespan = timespanAsString(bb, eb, date, be, ee, 'nb')

      return {
        title: timespan,
        subtitle: block
          ? block.children
            .filter((child) => child._type === 'span')
            .map((span) => span.text)
            .join('')
          : '',
      }
    }, 
  },*/
}
