import { Link } from 'part:@sanity/base/router';
import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';


export const image = {
  name: 'image',
  title: 'Thumbnail',
  titleEN: 'Thumbnail',
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
  type: 'DigitalObjectImage',
  options: {
    hotspot: true,
    semanticSanity: {
      '@type': '@json'
    }
  },
};
