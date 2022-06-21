import { coalesceLabel } from "../../../helpers"

export default {
  name: 'ObjectBlock',
  type: 'object',
  title: 'Single object',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fields: [
    {
      name: 'useViewer',
      title: 'Visningsvalg',
      titleEN: 'View choice',
      description: 'Velg enkeltside-visning eller galleri med alle objektets bilder. Bokvisning er standard.',
      type: 'string',
      initialValue: 'book',
      options: {
        list: [
          { title: 'Mirador', value: 'mirador' },
          { title: 'Simple', value: 'yith' },
          { title: 'Advanced', value: 'clover' },
          { title: 'Static image', value: 'static' },
        ],
      },
    },
    {
      name: 'item',
      title: 'Objekt',
      titleEN: 'Item',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'ObjectBlockItem' }
          ],
        }
      ]
    },
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Heading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'simpleBlockContent',
    },
  ],
  preview: {
    select: {
      title: 'item.label',
      media: 'item.image',
    },
    prepare({ title, media }) {
      return {
        title: coalesceLabel(title),
        subtitle: 'Single Object',
        media: media,
      }
    },
  },
}
