import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const consistsOf = defineField({
  name: 'consistsOf',
  title: 'Consists of',
  description: (
    <span>
      The material the item is produced with, eg. leather and-or parchment.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#consists-of'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Material' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id',
    },
  },
})
