import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const referredToBy = {
  name: 'referredToBy',
  title: 'Beskrivelse',
  titleEN: 'Description',
  description: (
    <span>
      Objektet kan ha mange beskrivelser, korte og/eller lange. Tekstene kan types for ulike
      bruksformål.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#description'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      The object can have multiple descriptions of varying lengths and purposes.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#description'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    { type: 'LinguisticObject' },
  ],
  options: {
    editModal: 'fullscreen',
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
