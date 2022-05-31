import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'part:@sanity/base/router';
import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({ apiVersion: '2021-03-25', useCdn: false })

export const preferredIdentifier = {
  name: 'preferredIdentifier',
  title: 'Foretrukket identifikator',
  titleEN: 'Preferred identifier',
  description: (
    <span>
      Identifikatoren som er gjeldende for dette objektet. Alternative, eksterne eller ugyldige
      identifikatorer kan registreres i <i>Identifiert av </i>.{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#preferred-identifier'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Current, valid identifier for this object. Alternative, external or invalid ifentifiers can be
      add to <i>identified by</i>.{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#preferred-identifier'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'string',
  validation: (Rule) => Rule.required().custom(async (prefId) => {
    const docs = await client.fetch(
      `*[preferredIdentifier == "${prefId}" && !(_id in path("drafts.**"))] { preferredIdentifier }`,
      { prefId }
    );
    return docs.length > 1 ? 'Value is not unique' : true;
  }),
};
