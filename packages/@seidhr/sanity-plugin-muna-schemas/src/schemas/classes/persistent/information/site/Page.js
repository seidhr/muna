import config from 'config:@sanity/document-internationalization';

export default {
  name: 'Page',
  type: 'document',
  title: 'Side',
  i18n: true,
  initialValue: {
    '__i18n_lang': config.base,
    '__i18n_refs': [],
  },
  fields: [
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Sideseksjoner',
      titleEN: 'Page sections',
      description: 'Legg til, rediger og endre rekkefølgen',
      descriptionEN: 'Add, edit, and reorder sections',
      type: 'array',
      of: [
        { type: 'HeroBlock' },
        { type: 'TextBlock' },
        { type: 'QuoteBlock' },
        { type: 'ObjectBlock' },
        { type: 'EventBlock' },
        { type: 'TableBlock' },
        { type: 'TwoColumnBlock' },
        { type: 'GridBlock' },
        { type: 'VideoBlock' },
        { type: 'InstagramBlock' },
        { type: 'IframeBlock' },
      ],
      options: {
        semanticSanity: {
          '@type': '@json'
        }
      },
    },
  ],
}
