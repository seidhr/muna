import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const carries = {
  name: 'carries',
  title: 'Bærer verk',
  titleEN: 'Carries work',
  description: (
    <span>
      Verk som er representert i dette objektet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#carries'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Work represented on this object.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#carries'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'Work' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
