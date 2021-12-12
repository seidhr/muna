import { FaUser } from 'react-icons/fa'
import {
  editorialState,
  accessState,
  referredToBy,
  label,
  identifiedBy,
  memberOf,
  image,
  wasOutputOf,
  inDataset,
  homepage,
  shortDescription,
  sortLabel,
} from '../props'
import { coalesceLabel, timespanAsString } from '../helpers'

export default {
  name: 'Actor',
  title: 'Actor',
  type: 'document',
  initialValue: {
    editorialState: 'review',
    accessState: 'secret',
  },
  icon: FaUser,
  fieldsets: [
    {
      name: 'state',
      title: 'Status',
      options: { collapsible: true, collapsed: false, columns: 2 },
    },
    {
      name: 'minimum',
      title: 'Basic metadata',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'representation',
      title: 'Hovedbilde og IIIF manifest',
      options: { collapsible: true, collapsed: false },
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
    label,
    sortLabel,
    shortDescription,
    homepage,
    {
      ...identifiedBy,
      fieldset: 'minimum',
    },
    {
      ...referredToBy,
      fieldset: 'minimum',
    },
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'array',
      fieldset: 'minimum',
      of: [
        {
          type: 'reference',
          to: [{ type: 'ActorType' }],
        },
      ],
      validation: Rule => Rule.min(1).warning('Du bør ha "Person" eller "Gruppe" som første type!'),
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description:
        'En aktivitetsstrøm samler alle hendelser knyttet til denne aktøren. Fødsel og død er "inline" til personen, mens andre aktiviteter som ekteskap er egne dokument.',
      descriptionEN: 'Add all known events this smuck did',
      type: 'array',
      of: [
        { type: 'Birth' },
        { type: 'reference', to: [{ type: 'Activity' }, { type: 'Event' }] },
        { type: 'Move' },
        { type: 'Joining' },
        { type: 'Leaving' },
        { type: 'Death' },
      ],
      options: {
        editModal: 'fullscreen',
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
    memberOf,
    {
      ...image,
      fieldset: 'representation',
    },
    inDataset,
    wasOutputOf
  ],
  preview: {
    select: {
      label: 'label',
      sortLabel: 'sortLabel',
      type: 'hasType.0.label',
      bb: 'activityStream.0.timespan.0.beginOfTheBegin',
      eb: 'activityStream.0.timespan.0.endOfTheBegin',
      date: 'activityStream.0.timespan.0.date',
      be: 'activityStream.0.timespan.0.beginOfTheEnd',
      ee: 'activityStream.0.timespan.0.endOfTheEnd',
      media: 'image',
      imported: 'wasOutputOf'
    },
    prepare(selection, viewOptions = {}) {
      const { label, sortLabel, type, media, imported, bb, eb, date, be, ee } = selection
      const timespan = timespanAsString(bb, eb, date, be, ee, 'nb')
      const wasImported = imported ? `Importert fra ${imported.hasSender.label}` : ''

      const title = viewOptions.ordering && viewOptions.ordering.by.field === 'sortLabel'
        ? sortLabel ?? label
        : label

      return {
        title: coalesceLabel(title),
        subtitle: `${type ? coalesceLabel(type, 'nor') + '. ' : ''}${timespan ? 'Født: ' + timespan : ''} ${wasImported}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Navn, A-Å',
      name: 'labelAsc',
      by: [{ field: 'label.no', direction: 'asc' }],
    },
    {
      title: 'Navn, Å-A',
      name: 'labelDesc',
      by: [{ field: 'label.no', direction: 'desc' }],
    },
    {
      title: 'Invertert navn, A-Å',
      name: 'sortLabelAsc',
      by: [{ field: 'sortLabel', direction: 'asc' }],
    },
    {
      title: 'Invertert navn, Å-A',
      name: 'sortLabelDesc',
      by: [{ field: 'sortLabel', direction: 'desc' }],
    },
  ],
}
