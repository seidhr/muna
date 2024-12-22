import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const presentAt = defineField({
  name: 'presentAt',
  title: 'Was present at',
  description: (
    <span>
      This object was present at an event or activity.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#present-at'}>
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
