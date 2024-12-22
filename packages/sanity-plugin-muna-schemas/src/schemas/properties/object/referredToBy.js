import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const referredToBy = defineField({
  name: 'referredToBy',
  title: 'Description',
  description: (
    <span>
      The object can have multiple descriptions of varying lengths and purposes.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#description'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [{ type: 'LinguisticObject' }],
  options: {
    editModal: 'fullscreen',
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
