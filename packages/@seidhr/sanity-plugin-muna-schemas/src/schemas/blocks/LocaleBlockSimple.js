export default {
  name: 'LocaleBlockSimple',
  type: 'object',
  title: 'LocaleBlockSimple',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: 'no',
      title: 'Norsk',
      type: 'string',

    }
  ],
  /* fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'simpleBlockContent',
    fieldset: lang.isDefault ? null : 'translations',
  })), */
  preview: {
    select: {
      blocks: 'nor',
    },
    prepare(selection) {
      const { blocks } = selection
      const desc = (blocks || []).find((block) => block._type === 'block')

      return {
        title: desc
          ? desc.children
            .filter((child) => child._type === 'span')
            .map((span) => span.text)
            .join('')
          : 'No description',
      }
    },
  },
}
