import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const measuredBy = defineField({
  name: 'measurement',
  title: 'Measured by',
  description: (
    <span>
      <strong>Experimental:</strong> Measurment of the object.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#measurement'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [{ type: 'Measurement' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
