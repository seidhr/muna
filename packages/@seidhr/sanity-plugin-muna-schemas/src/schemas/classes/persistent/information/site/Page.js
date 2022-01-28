export default {
  name: 'Page',
  type: 'document',
  title: 'Side',
  titleEN: 'Page',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'string',
    },
    {
      name: 'navMenu',
      title: 'Navigasjonsmeny',
      titleEN: 'Navigation menu',
      // weak: true, // Uncomment if you want to be able to delete navigation even though pages refer to it
      description: 'Hvilken navigasjonsmeny skal vises, om noen',
      descriptionEN: 'Which nav menu should be shown, if any',
      type: 'reference',
      to: [{ type: 'NavigationMenu' }],
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    {
      name: 'content',
      title: 'Sideseksjoner',
      titleEN: 'Page sections',
      description: 'Legg til, rediger og endre rekkefølgen',
      descriptionEN: 'Add, edit, and reorder sections',
      type: 'array',
      of: [
        { type: 'PageHeader' },
        { type: 'SvgTitle' },
        { type: 'Hero' },
        { type: 'SectionText' },
        { type: 'BigText' },
        { type: 'Quote' },
        { type: 'SubStory' },
        { type: 'SingleObject' },
        { type: 'MiradorGallery' },
        { type: 'IllustrationWithCaption' },
        { type: 'EventSection' },
        { type: 'Table' },
        { type: 'TimelineSection' },
        /* {type: 'Illustration'}, */
        { type: 'TwoColumn' },
        { type: 'Grid' },
        { type: 'Video' },
        { type: 'Social' },
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
