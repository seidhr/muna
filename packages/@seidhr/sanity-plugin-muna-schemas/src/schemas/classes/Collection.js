import {GiBookshelf} from 'react-icons/gi'
import {
  editorialState,
  accessState,
  referredToBy,
  preferredIdentifier,
  labelSingleton,
  identifiedBy,
  subjectOf,
} from '../props'

export default {
  title: 'Collection',
  name: 'Collection',
  type: 'document',
  initialValue: {
    editorialState: 'published',
    accessState: 'secret',
  },
  icon: GiBookshelf,
  fieldsets: [
    {
      name: 'state',
      title: 'Status',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'minimum',
      title: 'Basic metadata',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'representation',
      title: 'Hovedbilde og IIIF manifest',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'relations',
      title: 'Relations to other stuff',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'partsAndContent',
      title: 'Felt relatert til deler eller innhold',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'physicalDescription',
      title: 'Felt relatert til fysisk beskrivelse',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'ownership',
      title: 'Felt relatert til eierskap',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    editorialState,
    accessState,
    preferredIdentifier,
    labelSingleton,
    {
      ...identifiedBy,
      fieldset: 'minimum',
    },
    {
      ...referredToBy,
      fieldset: 'minimum',
    },
    {
      ...subjectOf,
      fieldset: 'minimum',
    },
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description: 'Events and activities connected to this object',
      type: 'array',
      of: [
        {type: 'Production'},
        {type: 'Transformation'},
        {type: 'Acquisition'},
        {type: 'Move'},
        {type: 'Destruction'},
      ],
      options: {
        editModal: 'fullscreen',
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
    {
      name: 'composedOf',
      title: 'Består av',
      titleEN: 'Composed of',
      description: 'Andre identifiserte undersamlinger som er en del av dette samlingen.',
      descriptionEN: 'Other identified subcollections this collection is composed of',
      type: 'array',
      of: [
        {
          type: 'reference', 
          to: [
            {type: 'Collection'},
            {type: 'HumanMadeObject'}
          ]
        }
      ],
      options: {
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'preferredIdentifier',
    },
    prepare(selection) {
      const {title, subtitle} = selection

      return {
        title: title,
        subtitle: subtitle ?? 'No identifier set',
      }
    },
  },
}
