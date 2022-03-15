import config from 'config:@seidhr/sanity-plugin-muna-schemas';

export default {
  name: 'LocaleString',
  type: 'object',
  title: 'Locale string',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true },
    },
  ],
  fields: config.i18n.languages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'string',
    fieldset: lang.isDefault ? null : 'translations',
  })),
}
