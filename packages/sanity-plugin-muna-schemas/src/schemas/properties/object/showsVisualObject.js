import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const showsVisualObject = defineField({
  name: 'showsVisualObject',
  title: 'Shown visual item',
  description: (
    <span>
      Visual item shown on this object.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#shown-visual-item'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [{ type: 'VisualObject' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
