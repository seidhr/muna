import config from 'config:@sanity/document-internationalization';
import jsonata from 'jsonata'
import { FaMarker } from 'react-icons/fa'
import { defaultFieldsets } from '../../../../fieldsets/defaultFieldsets'
import { accessState, editorialState, labelSingleton } from '../../../properties/datatype'
import { identifiedBy, image, language } from '../../../properties/object'

export default {
  name: 'LinguisticDocument',
  type: 'document',
  title: 'Text',
  i18n: true,
  initialValue: {
    '__i18n_lang': config.base,
    '__i18n_refs': [],
    editorialState: 'review',
    accessState: 'secret',
  },
  icon: FaMarker,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    labelSingleton,
    identifiedBy,
    /* {
      name: 'slug',
      title: 'Slug',
      titleEN: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the post',
      type: 'slug',
      options: {
        source: 'label',
        maxLength: 96,
      },
    }, */
    {
      name: 'creator',
      title: 'Skaper',
      titleEN: 'Author',
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
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
    language,
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
      validation: (Rule) => Rule.required(),
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    {
      name: 'categories',
      title: 'Kategorier',
      titleEN: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'Concept' }],
        },
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    /* {
      name: 'hasTranslation',
      title: 'Oversettelser',
      titleEN: 'Has translation',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'LinguisticDocument'}],
        },
      ],
    }, */
    {
      name: 'publishedAt',
      title: 'Publikasjonsdato',
      titleEN: 'Published at',
      description: 'This can be used to schedule post for publishing',
      type: 'datetime',
      options: {
        semanticSanity: {
          "@type": "xsd:dateTime"
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
          "@type": "@json"
        }
      },
    },
    {
      name: 'excerpt',
      title: 'Sammendrag',
      titleEN: 'Excerpt',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.',
      type: 'blockContent',
      options: {
        semanticSanity: {
          "@type": "@json"
        }
      },
    },
    image,
    {
      name: 'documentedIn',
      title: 'Documented in',
      titleEN: 'Dokumentert i',
      type: 'array',
      of: [{ type: 'file' }],
      options: {
        semanticSanity: {
          exclude: true
        }
      },
    },
  ],
  preview: {
    select: {
      title: 'label',
      blocks: 'excerpt',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, blocks, media } = selection
      const expression = jsonata('nor[0]')
      const block = expression.evaluate(blocks)

      return {
        title: title,
        description: block
          ? block.children
            .filter((child) => child._type === 'span')
            .map((span) => span.text)
            .join('')
          : 'No description',
        media: media,
      }
    },
  },
}