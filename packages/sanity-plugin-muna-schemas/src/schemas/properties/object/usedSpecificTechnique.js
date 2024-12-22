import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const usedSpecificTechnique = defineField({
  name: 'usedSpecificTechnique',
  title: 'Used spesific technique',
  description: (
    <span>
      The spesific technique that was employed in an activity.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#used-spesific-technique'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'DesignOrProcedure' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
