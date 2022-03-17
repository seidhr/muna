import config from 'config:@sanity/document-internationalization';

const supportedLanguages = config.languages.map(({ id, title }) => ({ id, title }))

export default {
  supportedLanguages,
  // Select Norwegian (Bokmål) by default
  defaultLanguages: [config.base],
  // Only show language filter for document type e.g. `page` (schemaType.name)
  // documentTypes: ['Concept', 'TextType'],
  filterField: (enclosingType, field, selectedLanguageIds) =>
    !enclosingType.name.startsWith('Localized') || selectedLanguageIds.includes(field.name),
}