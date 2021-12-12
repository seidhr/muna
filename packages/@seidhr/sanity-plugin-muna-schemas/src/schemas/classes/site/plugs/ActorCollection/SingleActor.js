import { coalesceLabel } from "../../../helpers"
import { file, image } from "../../../props"

export default {
  name: 'SingleActor',
  type: 'object',
  title: 'Single actor',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled?',
      type: 'boolean',
    },
    {
      name: 'showPersonalInformation',
      title: 'Vis personlig informasjon?',
      titleEN: 'Show personal information?',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'item',
      title: 'Omhandlet aktør',
      titleEN: 'Actor',
      type: 'reference',
      to: [{ type: 'Actor' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Tittel eller navn',
      titleEN: 'Heading',
      description: 'Om feltet benyttes vil den overstyre aktørens navn',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      description: 'Om feltet benyttes vil den overstyre aktørens beskrivelse',
      type: 'simpleBlockContent',
    },
    image,
    file
  ],
  preview: {
    select: {
      title: 'title',
      actorLabel: 'item.label',
      media: 'image',
      actorMedia: 'item.image',
    },
    prepare({ title, actorLabel, media, actorMedia }) {
      return {
        title: title ?? coalesceLabel(actorLabel),
        subtitle: 'Single Actor',
        media: media ?? actorMedia,
      }
    },
  },
}
