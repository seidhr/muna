import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const hasFormerOrCurrentOwner = {
  name: 'hasFormerOrCurrentOwner',
  title: 'Tidligere eller nåværende eier',
  titleEN: 'Former or current owner',
  description: (
    <span>
      Tidligere eller nåværende eier av dette objektet. Brukes også for usikkert eierskap.{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#former-or-current-owner'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Former or current owner of this object. Also used for uncertain ownership.{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#former-or-current-owner'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Actor' },
      ],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id'
    }
  },
};
