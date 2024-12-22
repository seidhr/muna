
export default {
  name: 'LocalizedSlug',
  type: 'object',
  title: 'Localized slug',
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
    validation: (Rule) => Rule.regex(/^[a-zA-Z0-9\-_]{0,60}$/),
    fieldset: lang.isDefault ? null : 'translations',
  })), */
}
