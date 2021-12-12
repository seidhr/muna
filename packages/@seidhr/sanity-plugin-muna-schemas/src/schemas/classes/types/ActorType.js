import { FaTag } from 'react-icons/fa'
import { editorialState, accessState, label, altLabel, broader, domain } from '../../props'
import { defaultFieldsets } from '../../fieldsets'
import { coalesceLabel } from '../../helpers'

export default {
  name: 'ActorType',
  title: 'Aktørtype',
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
      title: 'label'
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: coalesceLabel(title),
      }
    },
  },
}
