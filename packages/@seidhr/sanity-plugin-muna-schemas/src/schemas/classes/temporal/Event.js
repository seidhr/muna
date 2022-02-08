import { Link } from 'part:@sanity/base/router'
import React from 'react'
import { FaCalendar } from 'react-icons/fa'
import { coalesceLabel, timespanAsString } from '../../../helpers'
import { accessState, editorialState, labelSingleton } from '../../properties/datatype'
import { referredToBy, timespan, tookPlaceAt } from '../../properties/object'

export default {
  name: 'Event',
  type: 'document',
  title: 'Event',
  initialValue: {
    editorialState: 'review',
    accessState: 'secret',
  },
  icon: FaCalendar,
  fieldsets: [
    {
      name: 'state',
      title: 'Status',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'core',
      title: 'Basic metadata',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'timelineMedium',
      title: 'Hovedbilde (brukt i tidslinke)',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'relations',
      title: 'Relations to other stuff',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    editorialState,
    accessState,
    labelSingleton,
    {
      ...referredToBy,
      fieldset: 'core',
    },
    {
      ...timespan,
      fieldset: 'core',
    },
    {
      ...tookPlaceAt,
      fieldset: 'core',
    },
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      description: (
        <span>
          Hendelsestype som f.eks. Soppsanking. Legg til{' '}
          <Link target="blank" href={'/desk/andreTyper;EventType'}>
            ny hendelsestype
          </Link>
          .
        </span>
      ),
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'EventType' }],
        },
      ],
      validation: (Rule) => Rule.required(),
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    {
      name: 'media',
      title: 'Media',
      titleEN: 'Media',
      type: 'DigitalObjectImage',
      fieldset: 'timelineMedium',
      options: {
        semanticSanity: {
          '@type': '@json'
        }
      },
    },
    {
      name: 'location',
      type: 'geopoint',
      title: 'Lokasjon',
      titleEN: 'Location',
      description: 'Where the hell did this happen?!',
      options: {
        semanticSanity: {
          '@type': '@json'
        }
      },
    },
  ],
  preview: {
    select: {
      title: 'label',
      bb: 'timespan.0.beginOfTheBegin',
      eb: 'timespan.0.endOfTheBegin',
      date: 'timespan.0.date',
      be: 'timespan.0.beginOfTheEnd',
      ee: 'timespan.0.endOfTheEnd',
      type: 'hasType.0.label',
    },
    prepare(selection) {
      const { title, type, bb, eb, date, be, ee } = selection
      const timespanString = timespanAsString(bb, eb, date, be, ee, 'nb')

      return {
        title: title,
        subtitle: `${coalesceLabel(type)} ${timespanString}`,
      }
    },
  },
}
