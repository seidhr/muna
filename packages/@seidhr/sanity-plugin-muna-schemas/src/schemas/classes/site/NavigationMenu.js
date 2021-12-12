import {language} from '../props'

export default {
  name: 'NavigationMenu',
  type: 'document',
  title: 'Navigasjons meny',
  title: 'Navigation menu',
  fields: [
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'string',
    },
    language,
    {
      type: 'array',
      name: 'items',
      title: 'Menypunkt',
      titleEN: 'Items',
      of: [{type: 'NavigationItem'}],
      options: {
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
  ],
}
