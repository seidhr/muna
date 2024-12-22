import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const depicts = defineField({
  name: 'depicts',
  title: 'Depicts',
  description: (
    <span>
      Depictions on this object.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#depicts'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'HumanMadeObject' }, { type: 'Actor' }, { type: 'Concept' }, { type: 'Place' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
