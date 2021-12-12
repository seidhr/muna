export default {
  name: 'OpenGraph',
  type: 'object',
  title: 'Open Graph',
  fields: [
    {
      name: 'title',
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
      type: 'DigitalImageObject',
      options: {
        semanticSanity: {
          '@type': '@json'
        }
      },
    },
    /*
    // You can add videos to Open Graph tags too
    {
      name: 'video',
      title: 'Video',
      type: 'mux.video'
    }
    */
  ],
  preview: {
    select: {
      title: 'title',
      route: 'route.slug.current',
      link: 'link',
    },
    prepare({title, route, link}) {
      return {
        title,
        subtitle: route ? `Route: /${route}/` : link ? `External link: ${link}` : 'Not set',
      }
    },
  },
}
