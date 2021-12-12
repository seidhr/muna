export default {
  name: 'Era',
  title: 'Era',
  type: 'object',
  fields: [
    {
      name: 'headline',
      title: 'Tittel',
      titleEN: 'Headline',
      type: 'string',
    },
    {
      name: 'text',
      text: 'Tekst',
      textEN: 'Text',
      type: 'LocaleBlock',
    },
    {
      name: 'startDate',
      title: 'Startdato',
      titleEN: 'Start date',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'Sluttdato',
      titleEN: 'End date',
      type: 'date',
    },
  ],
}
