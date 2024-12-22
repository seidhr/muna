import { BsFillQuestionCircleFill } from 'react-icons/bs'

export const hasFormerOrCurrentOwner = {
  name: 'hasFormerOrCurrentOwner',
  title: 'Former or current owner',
  description: (
    <span>
      Former or current owner of this object. Also used for uncertain ownership.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#former-or-current-owner'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Actor' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id',
    },
  },
}
