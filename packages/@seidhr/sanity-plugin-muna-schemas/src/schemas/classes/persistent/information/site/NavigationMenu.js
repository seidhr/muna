import { language } from '../../../../properties/object'

export default {
  name: 'NavigationMenu',
  type: 'document',
  title: 'Navigasjons meny',
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
      of: [{ type: 'NavigationItem' }],
      options: {
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
  ],
}
