import config from 'config:@sanity/document-internationalization';

const supportedLanguages = config.languages.map(({ id, title }) => ({ id, title }))

export default {
  supportedLanguages,
  // Select Norwegian (Bokmål) by default
  defaultLanguages: [config.base],
  // Only show language filter for document type `page` (schemaType.name)
  documentTypes: ['Concept', 'TextType'],
  filterField: (enclosingType, field, selectedLanguageIds) =>
    !enclosingType.name.startsWith('Locale') || selectedLanguageIds.includes(field.name),
}