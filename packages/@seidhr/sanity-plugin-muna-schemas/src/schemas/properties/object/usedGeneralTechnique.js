import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const usedGeneralTechnique = {
  name: 'usedGeneralTechnique',
  title: 'Brukte generell teknikk',
  titleEN: 'Used general technique',
  description: (
    <span>
      Teknikker eller metoder brukt i aktiviteten. Legg til{' '}
      <Link target="blank" href={'/desk/typer;technique'}>
        ny teknikk
      </Link>
      .{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#used-general-technique'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      The techniques or methods that was employed in an activity. Add{' '}
      <Link target="blank" href={'/desk/typer;technique'}>
        new technique
      </Link>
      .{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#used-general-technique'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Technique' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
