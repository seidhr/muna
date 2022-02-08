import { FaGifts } from 'react-icons/fa'
import { coalesceLabel } from '../../../../helpers/coalesceLabel'
import { accessState, editorialState, labelSingleton } from '../../../properties/datatype'
import {
  identifiedBy, referredToBy, subjectOf, timespan, transferredTitleFrom, transferredTitleOf, transferredTitleTo
} from '../../../properties/object'

export default {
  name: 'Acquisition',
  title: 'Acquisition',
  type: 'document',
  initialValue: {
    editorialState: 'review',
    accessState: 'secret',
  },
  icon: FaGifts,
  fieldsets: [
    {
      name: 'state',
      title: 'Status',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'core',
      title: 'Basic metadata',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'ownership',
      title: 'Felt relatert til eierskap',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    editorialState,
    accessState,
    labelSingleton,
    {
      ...identifiedBy,
      fieldset: 'core',
    },
    {
      ...referredToBy,
      fieldset: 'core',
    },
    {
      ...subjectOf,
      fieldset: 'core',
    },
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'array',
      fieldset: 'core',
      of: [
        {
          type: 'reference',
          to: [{ type: 'AcquisitionType' }],
        },
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    timespan,
    {
      ...transferredTitleOf,
      fieldset: 'ownership',
    },
    {
      ...transferredTitleFrom,
      fieldset: 'ownership',
    },
    {
      ...transferredTitleTo,
      fieldset: 'ownership',
    },
    {
      name: 'consistsOf',
      title: 'Underakkvisisasjon',
      titleEN: 'Sub acquisition',
      description: 'Events and activities connected to this object',
      type: 'array',
      of: [{ type: 'Acquisition' }],
      options: {
        editModal: 'fullscreen',
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
    {
      name: 'documentedIn',
      title: 'Documented in',
      titleEN: 'Dokumentert i',
      type: 'array',
      of: [{ type: 'file' }],
      options: {
        editModal: 'fullscreen',
        semanticSanity: {
          exclude: false
        }
      },
    },
  ],
  preview: {
    select: {
      type: 'hasType.0.label',
      title: 'label',
      published: 'accessState',
    },
    prepare(selection) {
      const { type, title, published } = selection
      const secret = published === 'secret' ? '🔒' : ''

      return {
        title: coalesceLabel(title),
        subtitle: secret + type,
      }
    },
  },
}
