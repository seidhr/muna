import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

/**
 * Identified by
 * P1_is_identified_by
 */

export const identifiedBy = defineField({
  name: 'identifiedBy',
  title: 'Identified by',
  description: (
    <span>
      Current, alternative, external or invalid ifentifiers.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#identified-by'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [{ type: 'Name' }, { type: 'Identifier' }],
  options: {
    editModal: 'popup',
    semanticSanity: {
      '@container': '@list',
      '@type': '@id',
    },
  },
})
