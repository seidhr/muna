import { FaClipboard } from 'react-icons/fa'
import { defaultFieldsets } from '../../../../fieldsets/defaultFieldsets'
import { coalesceLabel } from '../../../../helpers/coalesceLabel'
import { accessState, editorialState, label } from '../../../properties/datatype'
import { identifiedBy, image, referredToBy } from '../../../properties/object'

export default {
  name: 'DesignOrProcedure',
  title: 'Design or procedure',
  type: 'document',
  initialValue: {
    editorialState: 'review',
    accessState: 'secret',
  },
  icon: FaClipboard,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    label,
    identifiedBy,
    referredToBy,
    image,
    {
      name: 'documentedIn',
      title: 'Documented in',
      titleEN: 'Dokumentert i',
      type: 'array',
      of: [{ type: 'file' }],
      options: {
        semanticSanity: {
          exclude: true
        }
      },
    },
  ],
  preview: {
    select: {
      title: 'label',
      blocks: 'referredToBy.0.body',
    },
    prepare(selection) {
      const { title, blocks } = selection
      const desc = (blocks || []).find((block) => block._type === 'block')

      return {
        title: coalesceLabel(title),
        description: desc
          ? desc.children
            .filter((child) => child._type === 'span')
            .map((span) => span.text)
            .join('')
          : 'No description',
      }
    },
  },
}
