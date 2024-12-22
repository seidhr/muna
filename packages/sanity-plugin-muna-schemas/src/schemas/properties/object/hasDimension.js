import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const hasDimension = defineField({
  name: 'hasDimension',
  titleEN: 'Has dimension',
  descriptionEN: (
    <span>
      <strong>Experimental:</strong> Dimension of the object.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#dimension'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [{ type: 'Dimension' }],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id',
    },
  },
})
