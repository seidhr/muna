import { BsFillQuestionCircleFill } from 'react-icons/bs'
import config from 'config:@sanity/document-internationalization'

//!TODO Fix config options
export const subjectOf = {
  name: 'subjectOf',
  title: 'Subject of',
  description: (
    <span>
      <strong>Experimental:</strong> Texts that have this object as its main subject, both internal
      and other texts.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#subject-of'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'LinguisticDocument' }],
    },
  ],
  options: {
    filter: '__i18n_lang == $base',
    filterParams: { base: config.base },
    semanticSanity: {
      '@container': '@list',
      '@type': '@id',
    },
  },
}
