import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const composedOf = {
  name: 'composedOf',
  title: 'Består av',
  titleEN: 'Composed of',
  description: (
    <span>
      Andre identifiserte objekt som er en del av dette objektet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#composed-of'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Other identified madeObjects this object is composed of.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#composed-of'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'HumanMadeObject' }
      ]
    }
  ],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id'
    }
  },
};
