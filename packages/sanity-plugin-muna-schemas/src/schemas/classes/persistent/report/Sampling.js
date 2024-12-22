import { defaultFieldsets } from '../../../..'
import { carriedOutBy, referredToBy, timespan, tookPlaceAt, usedGeneralTechnique, usedObjectOfType, usedSpecificObject, usedSpecificTechnique } from '../../../properties/object'

// Se https://link.springer.com/article/10.1007/s00799-016-0199-x for eksempel på modellering

export default {
  name: 'Sampling',
  title: 'Prøvetaking',
  titleEN: 'Sampling',
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
  ],
  preview: {
    select: {
      date: 'productionDate',
    },
    prepare(selection) {
      const { date } = selection
      return {
        title: `Prøvetaking ${date ? `, datert ${date}` : ''}`,
      }
    },
  },
}
