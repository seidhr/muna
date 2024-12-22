import { image } from '../../../properties/object'

export default {
  type: 'object',
  name: 'ItemView',
  title: 'Visning',
  titleEN: 'Item view',
  fieldsets: [
    {
      name: 'internal',
      title: 'Internt objekt',
      titleEN: 'Internal object',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'external',
      title: 'Eksternt objekt',
      titleEN: 'External object',
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
    {
      name: 'view',
      title: 'Visningsvalg',
      titleEN: 'View choice',
      description: 'Velg enkeltside-visning eller galleri med alle objektets bilder. Bokvisning er standard.',
      type: 'string',
      options: {
        list: [
          { title: 'Zoom', value: 'zoom' },
          { title: 'Book', value: 'book' },
          { title: 'Single', value: 'single' },
          { title: 'Gallery', value: 'gallery' },
        ],
      },
    },
    {
      name: 'manifestRef',
      title: 'Manifest',
      titleEN: 'Manifest',
      type: 'reference',
      to: [{ type: 'HumanMadeObject' }],
      fieldset: 'internal',
    },
    {
      name: 'canvasUrl',
      title: 'Canvas URL',
      titleEN: 'Canvas URL',
      type: 'url',
    },
    image,
    {
      name: 'manifestUrl',
      title: 'Manifest adresse',
      titleEN: 'Manifest URL',
      type: 'url',
      fieldset: 'external',
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
      subtitle: 'label',
      media: 'illustration',
      disabled: 'disabled',
    },
    prepare({ title, media, disabled }) {
      return {
        title: title,
        subtitle: `${disabled ? 'Avslått: ' : ''}Illustrasjon`,
        media: media?.image,
      }
    },
  },
}
