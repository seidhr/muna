import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const composedOf = defineField({
  name: 'composedOf',
  title: 'Composed of',
  description: (
    <span>
      Other identified items this object is composed of.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#composed-of'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'HumanMadeObject' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id',
    },
  },
})
