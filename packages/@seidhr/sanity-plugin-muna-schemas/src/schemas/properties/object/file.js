import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';

export const file = {
  name: 'file',
  title: 'Fil',
  titleEN: 'File',
  description: (
    <span>
      Last opp eller velg et bilde. Dette er bildet som brukes som forhåndsvisning.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#image'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Upload or choose a image. This image will be used for previews.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#image'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'file',
  options: {
    semanticSanity: {
      '@type': '@json'
    }
  },
};
