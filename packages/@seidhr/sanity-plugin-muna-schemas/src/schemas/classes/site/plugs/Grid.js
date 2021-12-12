import { BiGrid } from 'react-icons/bi'

export default {
  name: 'Grid',
  type: 'object',
  title: 'Rutenett',
  titleEN: 'Grid',
  description: 'Et rutenett (grid) med tekstinnhold',
  icon: BiGrid,
  fieldsets: [
    {
      name: 'subtitle',
      title: 'Undertittel',
      options: { collapsible: true, collapsed: true },
    },
  ],
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      name: 'title',
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
      name: 'columns',
      title: 'Kolonner',
      titleEN: 'Columns',
      type: 'string',
      options: {
        list: [
          {
            title: '1 kolonne',
            value: 'max1',
          },
          {
            title: '2 kolonner',
            value: 'max2',
          },
          {
            title: '3 kolonner',
            value: 'max3',
          },
        ],
      },
    },
    {
      name: 'items',
      title: 'Blokker',
      titleEN: 'Items',
      type: 'array',
      of: [
        {
          name: 'item',
          type: 'object',
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
              name: 'title',
              type: 'string',
            },
            {
              name: 'content',
              type: 'blockContent',
            },
            {
              name: 'illustration',
              title: 'Illustrasjonsbilde',
              titleEN: 'Illustration',
              type: 'Illustration',
            },
            {
              name: 'landingPageRoute',
              title: 'Nettside',
              titleEN: 'Landing page',
              description: 'Referanse til en "route" i datasettet',
              descriptionEN: 'Rerefence to a route in the dataset',
              fieldset: 'link',
              type: 'reference',
              to: [{ type: 'Route' }],
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
          ],
        },
      ],
    },
    {
      name: 'anchor',
      title: 'Anker',
      titleEN: 'Anchor',
      description: 'Brukes til å lage en ankerlenke',
      descriptionEN: 'Used for anchor link',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Grid'
      }
    }
  }
}
