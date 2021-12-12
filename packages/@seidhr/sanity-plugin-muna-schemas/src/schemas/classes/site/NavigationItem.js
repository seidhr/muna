export default {
  name: 'NavigationItem',
  type: 'object',
  title: 'Navigation item',
  fieldsets: [
    {
      title: 'Lenke',
      titleEN: 'Link',
      name: 'link',
      description: 'Bare den første av disse tre verdiene vil bli brukt',
      descriptionEN: 'Only the first value of these will be used',
    },
  ],
  fields: [
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'string',
    },
    {
      name: 'landingPageRoute',
      title: 'Nettside',
      titleEN: 'Landing page',
      description: 'Referanse til en "route" i datasettet',
      descriptionEN: 'Rerefence to a route in the dataset',
      fieldset: 'link',
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
      title: 'Undersider',
      titleEN: 'Children',
      type: 'array',
      of: [{type: 'NavigationItem'}],
      options: {
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
    {
      name: 'route',
      title: 'Sti',
      titleEN: 'Path',
      description: 'Referense til en "path" i frontend, som ikke er i Studioet',
      descriptionEN: 'Reference to a path in the frontend, not available in the Studio',
      fieldset: 'link',
      description: 'Example: search',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Ekstern lenke',
      titleEN: 'External link',
      description: 'Example: https://www.uib.no/ub',
      descriptionEN: 'Example: https://www.sanity.io',
      fieldset: 'link',
      type: 'string',
    },
    {
      name: 'kind',
      title: 'Lenketype',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['button', 'link'],
      },
    },
  ],
  preview: {
    select: {
      title: 'label',
      landingPage: 'landingPageRoute.slug.current',
      route: 'route',
      link: 'link',
    },
    prepare({title, landingPage, route, link}) {
      let subtitle = 'Not set'
      if (landingPage) {
        subtitle = `Route: /${landingPage}`
      }
      if (route) {
        subtitle = `Route: ${route}`
      }
      if (link) {
        subtitle = `External: ${link}`
      }
      return {
        title,
        subtitle,
      }
    },
  },
}
