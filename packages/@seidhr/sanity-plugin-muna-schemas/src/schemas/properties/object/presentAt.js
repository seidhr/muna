import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const presentAt = {
  name: 'presentAt',
  title: 'Var tilstede ved',
  titleEN: 'Was present at',
  description: (
    <span>
      Dette objektet var tilstede ved en hendelse eller aktivitet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#present-at'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      This object was present at an event or activity.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#present-at'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Event' },
        { type: 'Activity' }
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
