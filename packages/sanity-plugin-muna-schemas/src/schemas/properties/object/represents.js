import { BsFillQuestionCircleFill } from 'react-icons/bs'

export const represents = {
  name: 'represents',
  title: 'Represents',
  description: (
    <span>
      What this visual image represents.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#represents'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'HumanMadeObject' }, { type: 'Actor' }, { type: 'Concept' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
}
