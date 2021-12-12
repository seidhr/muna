import { coalesceLabel } from "../../helpers"
import { image } from "../../props"

export default {
  name: 'EventSection',
  type: 'object',
  title: 'Hendelse',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      name: 'item',
      title: 'Objekt',
      titleEN: 'Item',
      type: 'reference',
      to: [{ type: 'Event' }],
    },
    {
      name: 'title',
      title: 'Tittel eller navn',
      titleEN: 'Heading',
      description: 'Om feltet benyttes vil den overstyre hendelsens navn',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      description: 'Om feltet benyttes vil den overstyre hendelsens beskrivelse',
      type: 'simpleBlockContent',
    },
    image,
  ],
  preview: {
    select: {
      title: 'title',
      eventTitle: 'item.label',
      media: 'image',
      eventMedia: 'item.image',
    },
    prepare({ title, eventTitle, media, eventMedia }) {
      return {
        title: coalesceLabel(title) ?? coalesceLabel(eventTitle),
        subtitle: 'Event',
        media: media ?? eventMedia,
      }
    },
  },
}
