import { editorialState, accessState } from '../props'
import { defaultFieldsets } from '../fieldsets'
import { coalesceLabel } from '../helpers'

export default {
  name: 'LinguisticObject',
  type: 'object',
  title: 'Tekst',
  titleEN: 'Text',
  fieldsets: defaultFieldsets,
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
    editorialState,
    accessState,
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'TextType' }],
        },
      ],
      /* validation: (Rule) => Rule.required(), */
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    {
      name: 'body',
      title: 'Tekst',
      titleEN: 'Body',
      type: 'blockContent',
      options: {
        semanticSanity: {
          '@type': '@json'
        }
      },
    },
    {
      name: 'language',
      title: 'Språk',
      titleEN: 'Language',
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
      description: 'This can be used to schedule post for publishing',
      type: 'datetime',
    },
    {
      name: 'documentedIn', // TODO: Fix
      title: 'Dokumentert i',
      titleEN: 'Documented in',
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
        subtitle: `${type ? coalesceLabel(type) + ' på ' : ''} ${lang ? coalesceLabel(lang) : ''}`,
      }
    },
  },
}
