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
      name: 'internalRef',
      title: 'Object in the studio',
      titleEN: 'Manifest',
      type: 'reference',
      to: [{ type: 'HumanMadeObject' }],
      /* fieldset: 'internal', */
      hidden: ({ value, parent }) => !value && parent?.image || parent?.manifestUrl,
    },
    {
      ...image,
      /* fieldset: 'illustration', */
      hidden: ({ value, parent }) => !value && parent?.manifestUrl,
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
      hidden: ({ parent, value }) => !value && parent?.internalRef || parent?.image
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
      object: 'internalRef.image',
      illustration: 'image.asset',
      source: 'source',
    },
    prepare({ title, internalManifest, manifestUrl, object, illustration, source }) {
      const objectLabel = coalesceLabel(internalManifest)
      const hasIllustration = illustration ? null : 'Illustration'
      const sourceBlock = (source || []).find(block => block._type === 'block')

      const getSubtitle = objectLabel || manifestUrl || (sourceBlock
        ? sourceBlock.children
          .filter(child => child._type === 'span')
          .map(span => span.text)
          .join('') : null)

      return {
        title: (title || objectLabel || hasIllustration) ?? 'No label',
        subtitle: getSubtitle,
        media: object ?? illustration,
      }
    },
  },
}
