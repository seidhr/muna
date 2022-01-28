export default {
  name: 'TocLink',
  type: 'object',
  title: 'Lenke',
  titleEN: 'Link',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      titleEN: 'Title',
      description: 'Overstyr tittel fra målstien',
      descriptionEN: 'Override title from the target article',
      type: 'string',
    },
    {
      name: 'target',
      title: 'Målsti',
      titleEN: 'Target route',
      description: 'Uten målsti blir tittelen brukt som en undertittel',
      descriptionEN: 'No target route turns the item into a subheading',
      type: 'reference',
      to: [{type: 'Route'}],
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    {
      name: 'children',
      title: 'Barn',
      titleEN: 'Children',
      description: 'Det er mulig å nøste flere nivåer, men pass på, ikke bruk for mange!',
      descriptionEN: 'You could have sublevels, but use it sparingly!',
      type: 'array',
      of: [{type: 'TocLink'}],
      options: {
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      targetTitle: 'target.title',
    },
    prepare: ({title, targetTitle}) => ({
      title: title || targetTitle,
    }),
  },
}
