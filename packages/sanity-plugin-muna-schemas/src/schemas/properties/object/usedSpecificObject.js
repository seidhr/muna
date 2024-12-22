import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const usedSpecificObject = defineField({
  name: 'usedSpecificObject',
  titleEN: 'Used spesific object',
  descriptionEN: (
    <span>
      The object that was used in an activity.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#used-spesific-object'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'HumanMadeObject' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
