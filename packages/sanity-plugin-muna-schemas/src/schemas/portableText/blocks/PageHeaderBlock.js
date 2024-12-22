export default {
  name: 'PageHeaderBlock',
  type: 'object',
  title: 'Sideoverskrift',
  titleEN: 'Page Header',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fieldsets: [
    {
      name: 'subtitle',
      title: 'Undertittel',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Undertittel',
      titleEN: 'Subtitle',
      fieldset: 'subtitle',
      type: 'simpleBlockContent',
    },
    {
      name: 'illustration',
      title: 'Illustrasjon',
      titleEN: 'Illustration',
      type: 'Illustration',
    },
  ],
  preview: {
    select: {
      title: 'label',
      media: 'illustration',
    },
    prepare({ title, media }) {
      return {
        title: title,
        subtitle: 'Sideoverskrift',
        media: media?.image,
      }
    },
  },
}
