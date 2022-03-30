import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';
import config from 'config:@sanity/document-internationalization';

export const subjectOf = {
  name: 'subjectOf',
  title: 'Omhandlet i',
  titleEN: 'Subject of',
  description: (
    <span>
      <strong>Eksperimentel:</strong> Tekster om dette objektet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#subject-of'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      <strong>Experimental:</strong> Texts that have this object as its main subject, both internal
      and other texts.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#subject-of'}>
        <BsFillQuestionCircleFill />
      </Link>
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
      '@type': '@id'
    }
  },
};
