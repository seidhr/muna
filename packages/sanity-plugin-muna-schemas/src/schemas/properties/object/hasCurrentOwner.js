import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const hasCurrentOwner = defineField({
  name: 'hasCurrentOwner',
  title: 'Current owner',
  description: (
    <span>
      Current owner of this object.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#current-owner'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Actor' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id',
    },
  },
})
