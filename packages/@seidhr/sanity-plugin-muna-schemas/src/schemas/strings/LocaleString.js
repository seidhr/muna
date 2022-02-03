
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
  fields: [
    {
      name: 'no',
      title: 'Norsk',
      type: 'string',
      isDefault: true,
    }
  ]
  /* fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'string',
    fieldset: lang.isDefault ? null : 'translations',
  })), */
}
