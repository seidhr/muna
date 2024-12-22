import { coalesceLabel } from "../../../helpers"
import { labelSingleton } from '../../properties/datatype'

export default {
  name: 'CardBlock',
  type: 'object',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
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
    labelSingleton,
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'simpleBlockContent',
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
      type: 'string',
    },
    {
      name: 'link',
      title: 'Ekstern lenke',
      titleEN: 'External link',
      description: 'Example: https://www.uib.no/ub',
      descriptionEN: 'Example: https://www.uib.no/en/ub',
      fieldset: 'link',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'label',
      eventTitle: 'item.label',
      media: 'image',
      eventMedia: 'item.image',
    },
    prepare({ title, eventTitle, media, eventMedia }) {
      return {
        title: coalesceLabel(title) ?? coalesceLabel(eventTitle),
        subtitle: 'Event',
        media: media ?? eventMedia,
      }
    },
  },
}
