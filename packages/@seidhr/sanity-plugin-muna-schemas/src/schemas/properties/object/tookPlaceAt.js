import React from 'react';
import { Link } from 'part:@sanity/base/router';


export const tookPlaceAt = {
  name: 'tookPlaceAt',
  title: 'Skjedde ved',
  titleEN: 'Took place at',
  description: (
    <span>
      Hvor skjedde dette? Legg til{' '}
      <Link target="blank" href={'/desk/steder'}>
        nytt sted
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Where did this happen? Add{' '}
      <Link target="blank" href={'/desk/steder'}>
        a new place
      </Link>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'Place' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
