import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const usedGeneralTechnique = defineField({
  name: 'usedGeneralTechnique',
  title: 'Used general technique',
  description: (
    <span>
      The techniques or methods that was employed in an activity.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#used-general-technique'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Technique' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
