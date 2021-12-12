import { FaTag } from 'react-icons/fa'
import { editorialState, accessState, label, altLabel, wasOutputOf, sameAs, identifiedBy, preferredIdentifier, inDataset } from '../../props'
import { defaultFieldsets } from '../../fieldsets'
import { coalesceLabel } from '../../helpers'

export default {
  name: 'Concept',
  title: 'Concept',
  type: 'document',
  initialValue: {
    editorialState: 'published',
    accessState: 'open',
  },
  icon: FaTag,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    label,
    altLabel,
    identifiedBy,
    /* {
      name: 'broader',
      title: 'Overordnet term',
      titleEN: 'Broader',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'Concept'}]}],
    }, */
    /* {
      name: 'narrower',
      title: 'Underordnet term',
      titleEN: 'Narrower',
      description: 'Trenger vi narrower? Blir mye å registrere...',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'typeClass'}]}
      ]
    }, */
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description: 'Events and activities connected to this object',
      type: 'array',
      of: [{ type: 'Creation' }],
      options: {
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
    sameAs,
    inDataset,
    wasOutputOf
  ],
  preview: {
    select: {
      title: 'label',
      imported: 'wasOutputOf'
    },
    prepare(selection) {
      const { title, imported } = selection
      return {
        title: coalesceLabel(title),
        subtitle: imported ? `Importert fra ${imported.hasSender.label}` : 'Lokal'
      }
    },
  },
}
