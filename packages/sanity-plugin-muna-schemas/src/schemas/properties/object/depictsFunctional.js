import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const depictsFunctional = defineField({
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
  type: 'reference',
  to: [{ type: 'HumanMadeObject' }, { type: 'Actor' }, { type: 'Concept' }],
  options: {
    semanticSanity: {
      '@type': '@id',
    },
  },
})
