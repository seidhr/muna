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
        { type: 'Hero' },
        { type: 'SectionText' },
        { type: 'Quote' },
        { type: 'SingleObject' },
        { type: 'MiradorGallery' },
        { type: 'IllustrationWithCaption' },
        { type: 'EventSection' },
        { type: 'Table' },
        /* {type: 'Illustration'}, */
        { type: 'TwoColumn' },
        { type: 'Grid' },
        { type: 'Video' },
        { type: 'InstagramPost' },
        { type: 'Iframe' },
      ],
      options: {
        semanticSanity: {
          '@type': '@json'
        }
      },
    },
  ],
}
