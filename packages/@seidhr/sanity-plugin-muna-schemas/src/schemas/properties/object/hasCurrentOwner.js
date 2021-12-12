import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const hasCurrentOwner = {
  name: 'hasCurrentOwner',
  title: 'Nåværende eier',
  titleEN: 'Current owner',
  description: (
    <span>
      Nåværende eier av dette objektet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#current-owner'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Current owner of this object.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#current-owner'}>
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
