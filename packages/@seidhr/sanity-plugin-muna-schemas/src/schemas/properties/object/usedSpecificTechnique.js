import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const usedSpecificTechnique = {
  name: 'usedSpecificTechnique',
  title: 'Brukte spesifikk teknikk',
  titleEN: 'Used spesific technique',
  description: (
    <span>
      Spesifikk teknikk brukt i aktiviteten. Legg til{' '}
      <Link target="blank" href={'/desk/samlingsadministrasjon;designOrProcedure'}>
        ny tekniskbeskrivelse
      </Link>
      .{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#used-spesific-technique'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      The spesific technique that was employed in an activity. Add{' '}
      <Link target="blank" href={'/desk/samlingsadministrasjon;designOrProcedure'}>
        new procedure
      </Link>
      .{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#used-spesific-technique'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'DesignOrProcedure' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
