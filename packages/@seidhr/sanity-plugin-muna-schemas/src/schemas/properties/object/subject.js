import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';


export const subject = {
  name: 'subject',
  title: 'Emne',
  titleEN: 'Subject',
  description: (
    <span>
      Emneord knyttet til dette objektet. Legg til{' '}
      <Link target="blank" href={'/desk/steder'}>
        nye emneord
      </Link>
      .{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#subject'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Subjects related to this object. Add{' '}
      <Link target="blank" href={'/desk/steder'}>
        new subjects
      </Link>
      .{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#subject'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Concept' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
