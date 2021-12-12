import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const usedObjectOfType = {
  name: 'usedObjectOfType',
  title: 'Brukte objekt av type',
  titleEN: 'Used object of type',
  description: (
    <span>
      Objekttype som ble brukt i aktiviteten. Legg til{' '}
      <Link target="blank" href={'/desk/typer;objectType'}>
        ny objekttype
      </Link>
      .{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#used-object-of-type'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      The object type that was used in an activity.. Add{' '}
      <Link target="blank" href={'/desk/typer;objectType'}>
        new object type
      </Link>
      .{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#used-object-of-type'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'ObjectType' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
