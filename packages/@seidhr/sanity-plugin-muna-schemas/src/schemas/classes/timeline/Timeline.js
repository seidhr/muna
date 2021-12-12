import { GiCalendar } from 'react-icons/gi'
import { editorialState, accessState } from '../../props'
import { defaultFieldsets } from '../../fieldsets'
import { coalesceLabel } from '../../helpers'

export default {
  name: 'Timeline',
  type: 'document',
  title: 'Timeline',
  initialValue: {
    editorialState: 'review',
    accessState: 'secret',
  },
  icon: GiCalendar,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    {
      name: 'headline', // path: title.text.heading
      title: 'Tittel',
      titleEN: 'Headline',
      type: 'LocaleString',
    },
    {
      name: 'text', // path: title.text.text
      title: 'Tekst',
      titleEN: 'Text',
      type: 'LocaleBlock',
    },
    {
      name: 'media',
      title: 'Media',
      titleEN: 'Media',
      type: 'array',
      of: [
        { type: 'MediaObject' },
        { type: 'ExternalMediaObject' }
      ],
      validation: (Rule) => Rule.length(1).error('You should only register one media object'),
    },
    {
      name: 'scale',
      title: 'Skala',
      titleEN: 'Scale',
      description:
        "Either human or cosmological. If no scale is specified, the default is human. The cosmological scale is required to handle dates in the very distant past or future. (Before Tuesday, April 20th, 271,821 BCE after Saturday, September 13 275,760 CE) For the cosmological scale, only the year is considered, but it's OK to have a cosmological timeline with years between 271,821 BCE and 275,760 CE.",
      type: 'string',
      options: {
        list: [
          { title: 'Human', value: 'human' },
          { title: 'Cosmological', value: 'cosmological' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'eras',
      title: 'Era',
      titleEN: 'Era',
      description: 'Eras is used to label a span of time on the timeline navigation component.',
      type: 'array',
      of: [{ type: 'Era' }],
      preview: {
        select: {
          title: 'headline',
        },
        prepare(selection) {
          const { title } = selection
          return {
            title: title,
          }
        },
      },
    },
    {
      name: 'events',
      title: 'Hendelser',
      titleEN: 'Events',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'Event' }, { type: 'Activity' }],
        },
        { type: 'TimelineSlide' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headline',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: coalesceLabel(title),
      }
    },
  },
}
