import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const usedObjectOfType = defineField({
  name: 'usedObjectOfType',
  title: 'Used object of type',
  description: (
    <span>
      The object type that was used in an activity.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#used-object-of-type'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'ObjectType' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
