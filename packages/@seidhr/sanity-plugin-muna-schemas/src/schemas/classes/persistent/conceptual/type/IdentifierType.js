import { FaTag } from 'react-icons/fa'
import { coalesceLabel } from '../../../../../helpers/coalesceLabel'
import { defaultFieldsets } from '../../../../../vocabularies/defaultVocabularies'
import { accessState, altLabel, editorialState, label } from '../../../../properties/datatype'

export default {
  name: 'IdentifierType',
  title: 'Identifikatortype',
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
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: coalesceLabel(title),
      }
    },
  },
}
