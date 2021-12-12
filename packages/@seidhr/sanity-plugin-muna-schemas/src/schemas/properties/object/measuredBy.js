import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const measuredBy = {
  name: 'measurement',
  title: 'Måling',
  titleEN: 'Measured by',
  description: (
    <span>
      <strong>Eksperimentel:</strong> Måling av objektet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#measurement'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      <strong>Experimental:</strong> Measurment of the object.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#measurement'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [{ type: 'Measurement' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
