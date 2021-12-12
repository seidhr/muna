import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const hasDimension = {
  name: 'hasDimension',
  title: 'Har dimension',
  titleEN: 'Has dimension',
  description: (
    <span>
      <strong>Eksperimentel:</strong> Objektets dimension.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#dimension'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      <strong>Experimental:</strong> Dimension of the object.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#dimension'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [{ type: 'Dimension' }],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id'
    }
  },
};
