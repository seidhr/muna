
export const accessState = {
  name: 'accessState',
  title: 'Tilgangsstatus',
  titleEN: 'Access state',
  type: 'string',
  fieldset: 'state',
  initialValue: 'open',
  options: {
    list: [
      { title: 'Privat', value: 'secret' },
      { title: 'Open', value: 'open' },
    ],
    layout: 'radio',
    direction: 'vertical',
  },
};
