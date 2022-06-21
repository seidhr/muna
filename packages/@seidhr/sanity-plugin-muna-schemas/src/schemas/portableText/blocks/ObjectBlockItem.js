import { coalesceLabel } from "../../../helpers"
import { image } from '../../properties/object'

export default {
  name: 'ObjectBlockItem',
  title: 'Object block item',
  type: 'object',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
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
  initialValue: {
    view: 'single'
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
      description: 'Velg enkeltside-visning eller galleri med alle objektets bilder.',
      type: 'string',
      options: {
        list: [
          { title: 'Book', value: 'book' },
          { title: 'Single', value: 'single' },
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
      ...image,
      fieldset: 'internal',
    },
    {
      name: 'manifestUrl',
      title: 'Manifest adresse',
      titleEN: 'Manifest URL',
      type: 'url',
      fieldset: 'external',
    },
    {
      name: 'canvasUrl',
      title: 'Canvas URL',
      titleEN: 'Canvas URL',
      type: 'url',
      hidden: ({ parent, value }) => !value && !parent?.canvasIndex
    },
    {
      name: 'canvasIndex',
      title: 'Canvas number',
      titleEN: 'Canvas number',
      type: 'number',
      validation: Rule => Rule.integer(),
      hidden: ({ parent, value }) => !value && !parent?.canvasUrl
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
      internalManifest: 'manifestRef.label',
      manifestUrl: 'manifestUrl',
      media: 'manifestRef.image',
    },
    prepare({ internalManifest, manifestUrl, media }) {
      return {
        // eslint-disable-next-line no-nested-ternary
        title: internalManifest
          ? coalesceLabel(internalManifest)
          : manifestUrl
            ? manifestUrl
            : '',
        media: media,
      }
    },
  },
}
