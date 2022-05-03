import { GiStarFormation } from 'react-icons/gi'
import { coalesceLabel } from '../../../../helpers/coalesceLabel'
import { featured } from '../../../properties/datatype'
import { contributionAssignedBy, timespan, tookPlaceAt } from '../../../properties/object'

export default {
  name: 'BeginningOfExistence',
  type: 'document',
  title: 'Start på eksistens',
  titleEN: 'Beginning of existence',
  icon: GiStarFormation,
  fields: [
    featured,
    contributionAssignedBy,
    timespan,
    tookPlaceAt
  ],
  preview: {
    select: {
      contributor: 'contributionAssignedBy.0.assignedActor.label',
      contributorName: 'contributionAssignedBy.0.usedName.content',
      edtf: 'timespan.0.edtf',
    },
    prepare(selection) {
      const { contributor, contributorName, edtf } = selection
      const title = `Beginning of existence, by ${coalesceLabel(contributor) || contributorName || 'unknown'}`

      return {
        title: title,
        subtitle: edtf
      }
    },
  },
}
