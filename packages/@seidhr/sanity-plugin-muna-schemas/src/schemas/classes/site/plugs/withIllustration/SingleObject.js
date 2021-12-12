import { coalesceLabel } from "../../../helpers"

export default {
  name: 'SingleObject',
  type: 'object',
  title: 'Single object',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fields: [
    {
      name: 'view',
      title: 'Visningsvalg',
      titleEN: 'View choice',
      description: 'Velg enkeltside-visning eller galleri med alle objektets bilder. Bokvisning er standard.',
      type: 'string',
      initialValue: 'book',
      options: {
        list: [
          { title: 'Book', value: 'book' },
          { title: 'Single', value: 'single' },
          { title: 'Gallery', value: 'gallery' },
        ],
      },
    },
    {
      name: 'item',
      title: 'Objekt',
      titleEN: 'Item',
      type: 'reference',
      to: [{ type: 'HumanMadeObject' }],
    },
    {
      name: 'title',
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
    {
      name: 'canvasUrl',
      title: 'Canvas URL',
      titleEN: 'Canvas URL',
      type: 'url',
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
