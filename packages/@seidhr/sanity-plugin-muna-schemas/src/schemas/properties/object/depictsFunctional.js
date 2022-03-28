import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';

export const depictsFunctional = {
  name: 'depicts',
  title: 'Avbilder',
  titleEN: 'Depicts',
  description: (
    <span>
      Avbildet på dette objektet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#depicts'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Depictions on this object.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#depicts'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'reference',
  to: [
    { type: 'HumanMadeObject' },
    { type: 'Actor' },
    { type: 'Concept' }
  ],
  options: {
    semanticSanity: {
      '@type': '@id'
    }
  },
};
