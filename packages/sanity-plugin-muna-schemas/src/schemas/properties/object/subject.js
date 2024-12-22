import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const subject = defineField({
  name: 'subject',
  title: 'Subject',
  description: (
    <span>
      Subjects related to this object.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#subject'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Concept' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
