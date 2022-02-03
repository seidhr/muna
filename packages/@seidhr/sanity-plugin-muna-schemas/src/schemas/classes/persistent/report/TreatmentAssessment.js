import { Link } from 'part:@sanity/base/router'
import React from 'react'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defaultFieldsets } from '../../../../fieldsets/defaultFieldsets'
import { carriedOutBy, referredToBy, timespan, tookPlaceAt } from '../../../properties/object'

export default {
  name: 'TreatmentAssessment',
  title: 'Behandlingsvurdering',
  titleEN: 'Treatment assessment',
  type: 'object',
  fieldsets: defaultFieldsets,
  fields: [
    carriedOutBy,
    timespan,
    {
      name: 'success',
      title: 'Suksess?',
      titleEN: 'Success?',
      type: 'boolean',
    },
    tookPlaceAt,
    referredToBy,
    {
      name: 'images',
      title: 'Documentasjonsfotografi',
      titleEN: 'Documentation images',
      description: (
        <span>
          Bilder som dokumenterer behandlingsresultatet.{' '}
          <Link
            target="blank"
            href={'https://muna.xyz/docs/model/properties#documentation-images'}
          >
            <BsFillQuestionCircleFill />
          </Link>
        </span>
      ),
      descriptionEN: (
        <span>
          Images that documents the results of the treatment.{' '}
          <Link
            target="blank"
            href={'https://muna.xyz/docs/model/properties#documentation-images'}
          >
            <BsFillQuestionCircleFill />
          </Link>
        </span>
      ),
      fieldset: 'documentation',
      type: 'array',
      of: [{ type: 'DigitalObjectImage' }],
      options: {
        layout: 'grid',
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
  ],
  preview: {
    select: {
      date: 'productionDate',
    },
    prepare(selection) {
      const { date } = selection
      return {
        title: `Vurdering av behandling${date ? `, datert ${date}` : ''}`,
      }
    },
  },
}
