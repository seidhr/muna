import jsonata from 'jsonata'
import { Link } from 'part:@sanity/base/router'
import React from 'react'
import { FaBookDead } from 'react-icons/fa'
import { coalesceLabel } from '../../../../helpers/coalesceLabel'
import { accessState, editorialState, homepage, label, license, preferredIdentifier } from '../../../properties/datatype'
import {
  carries, composedOf, consistsOf, depicts, digitallyShownBy, hasCurrentOwner,
  hasFormerOrCurrentOwner, identifiedBy, image, measuredBy, presentAt, referredToBy,
  relation, showsVisualObject, subject, subjectOf, subjectOfManifest, wasOutputOf
} from '../../../properties/object'


export default {
  name: 'HumanMadeObject',
  type: 'document',
  title: 'Objekt',
  titleEN: 'Made Object',
  description: 'Menneskapte objekt',
  initialValue: {
    editorialState: 'review',
    accessState: 'secret',
  },
  icon: FaBookDead,
  fieldsets: [
    {
      name: 'state',
      title: 'Status',
      options: { collapsible: true, collapsed: false, columns: 2 },
    },
    {
      name: 'core',
      title: 'Basic metadata',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'mainImage',
      title: 'Hovedbilde',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'representation',
      title: 'Alle bilder',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'relations',
      title: 'Relations to other stuff',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'partsAndContent',
      title: 'Felt relatert til deler eller innhold',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'physicalDescription',
      title: 'Felt relatert til fysisk beskrivelse',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'ownership',
      title: 'Felt relatert til eierskap',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    editorialState,
    accessState,
    preferredIdentifier,
    label,
    homepage,
    {
      ...identifiedBy,
      fieldset: 'core',
    },
    {
      ...referredToBy,
      fieldset: 'core',
    },
    {
      name: 'hasType',
      type: 'array',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      description: (
        <span>
          If the correct type is not available, create it here{' '}
          <Link target="blank" href={'/desk/typer;objectType'}>
            Object type list
          </Link>
        </span>
      ),
      descriptionEN: '',
      fieldset: 'core',
      of: [
        {
          type: 'reference',
          to: [{ type: 'ObjectType' }],
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
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description: 'Hendelser og aktiviteter knyttet til dette objektet.',
      descriptionEN: 'Events and activities connected to this object',
      fieldset: 'core',
      type: 'array',
      of: [
        { type: 'BeginningOfExistence' },
        { type: 'Production' },
        { type: 'Transformation' },
        { type: 'reference', to: [{ type: 'Acquisition' }] },
        { type: 'Move' },
        { type: 'Activity' },
        { type: 'Destruction' },
      ],
      options: {
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
    {
      ...subject,
      fieldset: 'core',
    },
    {
      ...subjectOf,
      fieldset: 'core',
    },
    {
      ...license,
      fieldset: 'core',
    },
    {
      ...image,
      fieldset: 'mainImage',
    },
    {
      ...digitallyShownBy,
      fieldset: 'representation',
    },
    {
      ...subjectOfManifest,
      fieldset: 'representation',
    },
    {
      ...relation,
      fieldset: 'relations',
    },
    {
      ...presentAt,
      fieldset: 'relations',
    },
    {
      ...depicts,
      fieldset: 'partsAndContent',
    },
    {
      ...showsVisualObject,
      fieldset: 'partsAndContent',
    },
    {
      ...carries,
      fieldset: 'partsAndContent',
    },
    {
      ...composedOf,
      fieldset: 'partsAndContent',
    },
    {
      ...measuredBy,
      fieldset: 'physicalDescription',
    },
    {
      ...consistsOf,
      fieldset: 'physicalDescription',
    },
    {
      ...hasCurrentOwner,
      fieldset: 'ownership',
    },
    {
      ...hasFormerOrCurrentOwner,
      fieldset: 'ownership',
    },
    wasOutputOf
  ],
  preview: {
    select: {
      title: 'label',
      id: 'preferredIdentifier',
      type: 'hasType.0.label',
      blocks: 'description',
      media: 'image',
      published: 'accessState',
    },
    prepare(selection) {
      const { title, id, type, blocks, media, published } = selection
      const expression = jsonata('nor[0]')
      const block = expression.evaluate(blocks)
      const secret = published === 'secret' ? '🔒' : ''

      return {
        title: coalesceLabel(title),
        subtitle: secret + (id ? `${id}, ` : '') + coalesceLabel(type),
        description: block
          ? block.children
            .filter((child) => child._type === 'span')
            .map((span) => span.text)
            .join('')
          : '',
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Tittel, A-Å',
      name: 'label',
      by: [{ field: 'label', direction: 'asc' }],
    },
    {
      title: 'Tittel, Å-A',
      name: 'label',
      by: [{ field: 'label', direction: 'desc' }],
    },
    {
      title: 'Foretrukket id, Synkende',
      name: 'preferredIdentifier',
      by: [{ field: 'preferredIdentifier', direction: 'desc' }],
    },
    {
      title: 'Foretrukket id, Stigende',
      name: 'preferredIdentifier',
      by: [{ field: 'preferredIdentifier', direction: 'asc' }],
    },
  ],
}