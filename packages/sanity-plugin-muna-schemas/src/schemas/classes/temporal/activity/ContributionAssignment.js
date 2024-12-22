import { coalesceLabel } from "../../../.."
import { assignedRole, assignedActor, usedName } from '../../../properties/object'

export default {
  name: 'ContributionAssignment',
  type: 'object',
  title: 'Bidragspåstand',
  titleEN: 'Contribution Assignment',
  fields: [
    assignedActor,
    assignedRole,
    usedName,
  ],
  preview: {
    select: {
      actor: 'assignedActor.label',
      name: 'usedName.content',
      role: 'assignedRole.0.label',
    },
    prepare(selection) {
      const { actor, name, role } = selection
      return {
        title: name || coalesceLabel(actor),
        subtitle: `${role ? coalesceLabel(role) : ''}`,
      }
    },
  },
}
