import { coalesceLabel } from "../../../helpers"
import { labelSingleton } from '../../properties/datatype'

export default {
  name: 'ObjectBlock',
  type: 'object',
  title: 'Object(s) block',
  /* validation: Rule => Rule.custom((fields) => {
    const isMultiItem = fields?.item && fields.item.length > 1
    if (isMultiItem && ['clover', 'yith-1-col', 'mirador'].includes(fields?.variant)) {
      return 'Clover only supports one item'
    }
    return true
  }), */
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fields: [
    labelSingleton,
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'simpleBlockContent',
    },
    {
      name: 'variant',
      title: 'Visningsvalg',
      titleEN: 'View choice',
      description: 'Velg enkeltside-visning eller galleri med alle objektets bilder. Bokvisning er standard. NB! "Big single icon", "Single object zoom" og "Mirador" vil bare bruke det første objektet der som det er flere enn ett.',
      type: 'string',
      options: {
        list: [
          { title: 'Mirador', value: 'mirador' },
          /* { title: 'Icon with modal', value: 'yith' },
          { title: 'Icon banner', value: 'yith-interstitual' },
          { title: 'Single object zoom', value: 'clover' }, */
          { title: 'Static image', value: 'static' },
          { title: 'Static image, individual image captions', value: 'static-individual-captions' },
          { title: 'Juxtaposition', value: 'static-compare' },
        ],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'items',
      title: 'Objekt',
      titleEN: 'Item',
      type: 'array',
      of: [
        { type: 'ObjectBlockItem' }
      ],
    },
    {
      name: 'source',
      title: 'Kilde',
      description: 'Legg til kilde eller kreditering',
      titleEN: 'Source',
      type: 'simpleBlockContent',
    },
  ],
  preview: {
    select: {
      title: 'label',
      itemTitle: 'item.0.label',
      objectPreview: 'item.0.internalRef.image',
      blockPreview: 'item.0.image',
      variant: 'variant'
    },
    prepare({ title, itemTitle, objectPreview, blockPreview, variant }) {

      return {
        title: title ?? coalesceLabel(itemTitle),
        subtitle: `Object block [${variant}]. `,
        media: objectPreview ?? blockPreview,
      }
    },
  },
}
