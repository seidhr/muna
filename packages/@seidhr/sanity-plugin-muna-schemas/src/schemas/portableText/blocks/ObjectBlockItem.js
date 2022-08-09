import { coalesceLabel } from "../../../helpers"
import { labelSingleton } from '../../properties/datatype'
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
      ...labelSingleton,
      validation: null,
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
      description: 'Velg enkeltside-visning eller oppslagsvisning (oppslag bare mulig med Mirador).',
      type: 'string',
      options: {
        list: [
          { title: 'Book', value: 'book' },
          { title: 'Single', value: 'single' },
        ],
      },
    },
    {
      name: 'internalRef',
      title: 'Manifest',
      titleEN: 'Manifest',
      type: 'reference',
      to: [{ type: 'HumanMadeObject' }],
      /* fieldset: 'internal', */
      hidden: ({ value, parent }) => !value && parent?.image || parent?.manifestUrl,
    },
    {
      ...image,
      /* fieldset: 'illustration', */
      hidden: ({ value, parent }) => !value && parent?.internalRef || parent?.manifestUrl,
    },
    {
      name: 'manifestUrl',
      title: 'Manifest adresse',
      titleEN: 'Manifest URL',
      type: 'url',
      /* fieldset: 'external', */
      hidden: ({ value, parent }) => !value && parent?.image || parent?.internalRef,
    },
    {
      name: 'canvasUrl',
      title: 'Canvas URL',
      titleEN: 'Canvas URL',
      type: 'url',
      hidden: ({ parent, value }) => !value && parent?.canvasIndex || parent?.image
    },
    {
      name: 'canvasIndex',
      title: 'Canvas number',
      titleEN: 'Canvas number',
      type: 'number',
      validation: Rule => Rule.integer(),
      hidden: ({ parent, value }) => !value && parent?.canvasUrl || parent?.image
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
      internalManifest: 'internalRef.label',
      manifestUrl: 'manifestUrl',
      media: 'internalRef.image',
    },
    prepare({ title, internalManifest, manifestUrl, media }) {
      return {
        title: title ?? coalesceLabel(internalManifest),
        // eslint-disable-next-line no-nested-ternary
        subtitle: internalManifest
          ? coalesceLabel(internalManifest)
          : manifestUrl
            ? manifestUrl
            : '',
        media: media,
      }
    },
  },
}
