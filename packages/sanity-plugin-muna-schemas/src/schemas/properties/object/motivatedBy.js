import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const motivatedBy = defineField({
  name: 'motivatedBy',
  title: 'Motivated by',
  description: (
    <span>
      This object was present at an event or activity.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#motivated-by'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Event' }, { type: 'Activity' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
