import { defaultFieldsets } from '../../../../fieldsets/defaultFieldsets'
import { coalesceLabel } from '../../../../helpers/coalesceLabel'
import { accessState, editorialState } from '../../../properties/datatype'

export default {
  name: 'LinguisticObject',
  type: 'object',
  title: 'Tekst',
  titleEN: 'Text',
  fieldsets: defaultFieldsets,
  groups: [
    {
      name: 'core',
      title: 'Tekst',
      default: true,
    },
    {
      name: 'metadata',
      title: 'Metadata',
    }
  ],
  initialValue: {
    editorialState: 'published',
    accessState: 'open',
  },
  options: {
    semanticSanity: {
      '@id': 'muna:LinguisticDocument',
    }
  },
  fields: [
    {
      name: 'body',
      title: 'Tekst',
      titleEN: 'Body',
      group: 'core',
      type: 'blockContent',
      options: {
        semanticSanity: {
          '@type': '@json'
        }
      },
    },
    {
      ...editorialState,
      group: 'core',
    },
    {
      ...accessState,
      group: 'core',
    },
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      group: 'core',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'TextType' }],
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
      name: 'language',
      title: 'Språk',
      titleEN: 'Language',
      group: 'core',
      type: 'reference',
      to: [{ type: 'Language' }],
      validation: (Rule) => Rule.required(),
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    {
      name: 'creator',
      title: 'Skaper',
      titleEN: 'Creator',
      group: 'metadata',
      description:
        'Registrer en eller flere aktører som har skapt dette dokumentet, gjerne med hvilken rolle de hadde.',
      type: 'array',
      of: [
        {
          type: 'ContributionAssignment',
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
      name: 'publishedAt',
      title: 'Publikasjonsdato',
      titleEN: 'Published at',
      group: 'metadata',
      description: 'This can be used to schedule post for publishing',
      type: 'datetime',
    },
    {
      name: 'documentedIn',
      title: 'Dokumentert i',
      titleEN: 'Documented in',
      group: 'metadata',
      type: 'array',
      of: [{ type: 'file' }],
      options: {
        semanticSanity: {
          '@type': '@json'
        }
      },
    },
  ],
  preview: {
    select: {
      type: 'hasType.0.label',
      blocks: 'body',
      lang: 'language.label',
    },
    prepare(selection) {
      const { type, blocks, lang } = selection

      return {
        title: blocks?.length
          ? blocks[0].children
            .filter((child) => child._type === 'span')
            .map((span) => span.text)
            .join('')
          : 'No content',
        subtitle: `${type ? `${coalesceLabel(type)} på ` : ''} ${lang ? coalesceLabel(lang) : ''}`,
      }
    },
  },
}
