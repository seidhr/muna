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
          { title: 'Mirador galleri', value: 'mirador-gallery' },
          { title: 'Big single icon', value: 'yith-1-col' },
          { title: 'Icon (2 column)', value: 'yith-2-col' },
          { title: 'Icon (3 column)', value: 'yith-3-col' },
          { title: 'Icon banner', value: 'yith-interstitual' },
          { title: 'Single object zoom', value: 'clover' },
          { title: 'Static image', value: 'static' },
          { title: 'Static image grid', value: 'static-grid' },
        ],
      },
    },
    {
      name: 'item',
      title: 'Objekt',
      titleEN: 'Item',
      type: 'array',
      of: [
        { type: 'ObjectBlockItem' }
      ],
    },
  ],
  preview: {
    select: {
      title: 'label',
      itemTitle: 'item.0.label',
      media: 'item.0.image',
      variant: 'variant'
    },
    prepare({ title, itemTitle, media, variant }) {
      return {
        title: title ?? coalesceLabel(itemTitle),
        subtitle: `Object block [${variant}]`,
        media: media,
      }
    },
  },
}
