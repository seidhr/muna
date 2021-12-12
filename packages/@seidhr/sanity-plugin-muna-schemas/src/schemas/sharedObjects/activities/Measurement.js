import { timespan, referredToBy, tookPlaceAt, carriedOutBy, featured } from '../../props'
import { defaultFieldsets } from '../../fieldsets'
import { coalesceLabel } from '../../helpers'

export default {
  name: 'Measurement',
  type: 'object',
  title: 'Måling',
  titleEN: 'Measurement',
  fieldsets: defaultFieldsets,
  fields: [
    featured,
    {
      name: 'observedDimension',
      title: 'Dimensjon',
      titleEN: 'Dimension',
      description: 'Events and activities connected to this object',
      type: 'array',
      of: [{ type: 'Dimension' }],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    timespan,
    carriedOutBy,
    referredToBy,
    tookPlaceAt,
  ],
  preview: {
    select: {
      actor: 'carriedOutBy.0.actor.label',
      dimension0: 'observedDimension.0.hasType.label',
      unit0: 'observedDimension.0.hasUnit.label',
      value0: 'observedDimension.0.value',
      dimension1: 'observedDimension.1.hasType.label',
      unit1: 'observedDimension.1.hasUnit.label',
      value1: 'observedDimension.1.value',
      dimension2: 'observedDimension.2.hasType.label',
      unit2: 'observedDimension.2.hasUnit.label',
      value2: 'observedDimension.2.value',
    },
    prepare(selection) {
      const {
        actor,
        dimension0,
        dimension1,
        dimension2,
        unit0,
        unit1,
        unit2,
        value0,
        value1,
        value2,
      } = selection

      let d0, d1, d2

      if (dimension0) {
        d0 = `${coalesceLabel(dimension0) + ': ' || ''}${value0 + ' ' || ''}${coalesceLabel(unit0) || ''
          }`
      }
      if (dimension1) {
        d1 = `${coalesceLabel(dimension1) + ': ' || ''}${value1 + ' ' || ''}${coalesceLabel(unit1) || ''
          }`
      }
      if (dimension2) {
        d2 = `${coalesceLabel(dimension2) + ': ' || ''}${value2 + ' ' || ''}${coalesceLabel(unit2) || ''
          }`
      }

      return {
        title: `${d0 ? d0 : ''}${d1 ? ', ' + d1 : ''}${d2 ? ', ' + d2 : ''}`,
        subtitle: `Måling ${actor ? 'utført av ' + actor : ''}`,
      }
    },
  },
}
