import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const carries = defineField({
  name: 'carries',
  title: 'Carries work',
  description: (
    <span>
      Work represented on this object.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#carries'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'Work' }] }],
})
