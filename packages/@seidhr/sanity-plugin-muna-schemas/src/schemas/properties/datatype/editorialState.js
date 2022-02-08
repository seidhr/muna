
export const editorialState = {
  name: 'editorialState',
  title: 'Status',
  titleEN: 'State',
  type: 'string',
  fieldset: 'state',
  initialValue: 'published',
  options: {
    list: [
      { title: 'Til gjennomgang', value: 'review' },
      { title: 'Publisert', value: 'published' },
    ],
    layout: 'radio',
    direction: 'vertical',
  },
};
