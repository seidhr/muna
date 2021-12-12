import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const consistsOf = {
  name: 'consistsOf',
  title: 'Laget av',
  titleEn: 'Consists of',
  description: (
    <span>
      Hvilket material objektet er laget av, for eksempel lær og/eller pergament. Legg til{' '}
      <Link target="blank" href={'/desk/typer;material'}>
        nytt material
      </Link>
      .{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#consists-of'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      The material the item is produced with, eg. leather and-or parchment. Add{' '}
      <Link target="blank" href={'/desk/typer;material'}>
        new material
      </Link>
      .{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#consists-of'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Material' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id'
    }
  },
};
