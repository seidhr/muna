import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const usedSpecificObject = {
  name: 'usedSpecificObject',
  title: 'Brukte spesifikt objekt',
  titleEN: 'Used spesific object',
  description: (
    <span>
      Objekt som ble brukt i aktiviteten. Legg til{' '}
      <Link target="blank" href={'/desk/objekt'}>
        nytt objekt
      </Link>
      .{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#used-spesific-object'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      The object that was used in an activity. Add a{' '}
      <Link target="blank" href={'/desk/objekt'}>
        new object
      </Link>
      .{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#used-spesific-object'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'HumanMadeObject' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
