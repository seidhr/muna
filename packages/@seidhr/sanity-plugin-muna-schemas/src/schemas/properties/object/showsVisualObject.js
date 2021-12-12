import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const showsVisualObject = {
  name: 'showsVisualObject',
  title: 'Viser merke eller bilde',
  titleEN: 'Shown visual item',
  description: (
    <span>
      Motiv vist på dette objectet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#shown-visual-item'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Visual item shown on this object.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#shown-visual-item'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [{ type: 'VisualObject' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
