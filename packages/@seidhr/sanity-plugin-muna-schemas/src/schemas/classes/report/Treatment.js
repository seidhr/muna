import React from 'react'
import { Link } from 'part:@sanity/base/router'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { timespan, tookPlaceAt, referredToBy, carriedOutBy, usedGeneralTechnique, usedSpecificTechnique, usedObjectOfType, usedSpecificObject } from '../../props'
import { defaultFieldsets } from '../../fieldsets'

export default {
  name: 'Treatment',
  title: 'Behandling',
  titleEN: 'Treatment',
  type: 'object',
  fieldsets: defaultFieldsets,
  fields: [
    carriedOutBy,
    timespan,
    tookPlaceAt,
    referredToBy,
    usedGeneralTechnique,
    usedSpecificTechnique,
    usedObjectOfType,
    usedSpecificObject,
    {
      name: 'assessedBy',
      title: 'Vurdert av',
      titleEN: 'Assessment',
      description: (
        <span>
          Legg til en vurdering av behandlingen. Var det en suksess?{' '}
          <Link target="blank" href={'https://muna.xyz/docs/model/properties#assessment'}>
            <BsFillQuestionCircleFill />
          </Link>
        </span>
      ),
      descriptionEN: (
        <span>
          Add an assessment of the treatment, was it a success?{' '}
          <Link target="blank" href={'https://muna.xyz/docs/model/properties#assessment'}>
            <BsFillQuestionCircleFill />
          </Link>
        </span>
      ),
      type: 'array',
      of: [{ type: 'TreatmentAssessment' }],
      options: {
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
        title: `Behandling${date ? ', datert ' + date : ''}`,
      }
    },
  },
}
