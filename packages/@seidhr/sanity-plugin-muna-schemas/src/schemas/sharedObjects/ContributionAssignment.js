import { coalesceLabel } from "../helpers"

export default {
  name: 'ContributionAssignment',
  type: 'object',
  title: 'Bidragspåstand',
  titleEN: 'Contribution Assignment',
  fields: [
    {
      name: 'assignedActor',
      title: 'Aktør',
      titleEN: 'Actor',
      type: 'reference',
      to: [
        { type: 'Actor' },
      ],
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    {
      name: 'assignedRole',
      title: 'Rolle',
      titleEN: 'Role',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'Role' }],
        },
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    {
      name: 'usedName',
      title: 'Navn',
      titleEN: 'Name',
      description: 'Brukes dersom objektet er signert under annet navn enn aktørens fulle navn.',
      descriptionEN: 'Used if the object is signed with another than the preferred name of the actor.',
      type: 'Name'
    },
  ],
  preview: {
    select: {
      actor: 'assignedActor.label',
      name: 'usedName.content',
      role: 'role.0.label',
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
