import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const subjectOfManifest = {
  name: 'subjectOfManifest',
  title: 'Hovedmanifest',
  titleEN: 'Main manifest',
  type: 'url',
  description: (
    <span>
      Hovedmanifestet til objektet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#main-representation'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      The main manifest of this object.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#main-representation'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  )
};
