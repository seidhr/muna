export default {
  name: 'OpenGraph',
  type: 'object',
  title: 'Open Graph',
  fields: [
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      description: 'Advarsel! Dette vil overstyre sidens tittel.',
      descriptionEN: 'Heads up! This will override the page title.',
      type: 'string',
      validation: (Rule) => Rule.max(60).warning('Should be under 60 characters'),
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'text',
      validation: (Rule) => Rule.max(155).warning('Should be under 155 characters'),
    },
    {
      name: 'image',
      title: 'Bilde',
      titleEN: 'Image',
      description: 'Facebook anbefaler 1200x630 (størrelsen blir endret automatisk)',
      descriptionEN: 'Facebook recommends 1200x630 (will be auto resized)',
      type: 'DigitalObjectImage',
      options: {
        semanticSanity: {
          '@type': '@json'
        }
      },
    },
  ],
  preview: {
    select: {
      title: 'label',
      route: 'route.slug.current',
      link: 'link',
    },
    prepare({ title, route, link }) {
      return {
        title,
        // eslint-disable-next-line no-nested-ternary
        subtitle: route ? `Route: /${route}/` : link ? `External link: ${link}` : 'Not set',
      }
    },
  },
}
