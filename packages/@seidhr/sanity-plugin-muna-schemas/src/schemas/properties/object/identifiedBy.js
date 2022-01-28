import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';

/**
 * Identified by
 * P1_is_identified_by
 */

export const identifiedBy = {
  name: 'identifiedBy',
  title: 'Identifisert av',
  titleEN: 'Identified by',
  description: (
    <span>
      Gjeldende, alternative, eksterne eller ugyldige identifikatorer.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#identified-by'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Current, alternative, external or invalid ifentifiers.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#identified-by'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    { type: 'Name' },
    { type: 'Identifier' }
  ],
  options: {
    editModal: 'popup',
    semanticSanity: {
      '@container': '@list',
      '@type': '@id'
    }
  },
};
