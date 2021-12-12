import { timespan, timespanSingleton } from '../../props'
import { coalesceLabel, timespanAsString } from '../../helpers'

// TODO: Finish timeline with references to internal stuff and external. +datamodell
// See http://timeline.knightlab.com/docs/json-format.html#json-slide for more info

export default {
  name: 'TimelineSlide',
  title: 'Timeline slide',
  type: 'object',
  fields: [
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
        {
          type: 'reference',
          to: [{ type: 'HumanMadeObject' }],
        },
        { type: 'MediaObject' },
        { type: 'ExternalMediaObject' },
      ],
      validation: (Rule) => Rule.length(1).error('You can only register one media object'),
    },
    timespanSingleton,
    {
      name: 'group',
      title: 'Gruppe',
      titleEN: 'Group',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.length(1).error('An event can only be in one group!'),
    },
    {
      name: 'background',
      title: 'Bakgrunn',
      titleEN: 'Background',
      type: 'Background',
    },
  ],
  preview: {
    select: {
      title: 'headline',
      bb: 'timespan.beginOfTheBegin',
      eb: 'timespan.endOfTheBegin',
      date: 'timespan.date',
      be: 'timespan.beginOfTheEnd',
      ee: 'timespan.endOfTheEnd',
    },
    prepare(selection) {
      const { title, bb, eb, date, be, ee } = selection
      const timespan = timespanAsString(bb, eb, date, be, ee, 'nb')
      return {
        title: coalesceLabel(title),
        subtitle: timespan,
      }
    },
  },
}
