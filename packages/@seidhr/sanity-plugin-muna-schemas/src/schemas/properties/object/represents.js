import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const represents = {
  name: 'represents',
  title: 'Representerer',
  titleEN: 'Represents',
  description: (
    <span>
      Hva dette motivet representerer.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#represents'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      What this visual image represents.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#represents'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'HumanMadeObject' },
        { type: 'Actor' },
        { type: 'Concept' }
      ],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
