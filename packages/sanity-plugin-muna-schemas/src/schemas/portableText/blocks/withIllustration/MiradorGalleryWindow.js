import { coalesceLabel } from '../../../../helpers'

export default {
  title: 'Gallery manifest',
  name: 'MiradorGalleryWindow',
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
    view: 'book'
  },
  fields: [
    {
      name: 'view',
      title: 'Visningsvalg',
      titleEN: 'View choice',
      description: 'Velg enkeltside-visning eller galleri med alle objektets bilder. Bokvisning er standard.',
      type: 'string',
      options: {
        list: [
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
    },
    /* {
      name: 'canvasNumber',
      title: 'Canvas nummer',
      titleEN: 'Canvas number',
      type: 'number',
    }, */
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
        title: internalManifest ? coalesceLabel(internalManifest) : manifestUrl ? manifestUrl : '',
        media: media,
      }
    },
  },
}
