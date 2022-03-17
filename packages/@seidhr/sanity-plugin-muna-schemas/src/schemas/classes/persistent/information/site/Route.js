import sanityClient from 'part:@sanity/base/client'
import { MdLink } from 'react-icons/md'
import config from 'config:@sanity/document-internationalization'
import { coalesceLabel } from '../../../../../../lib'

const client = sanityClient.withConfig({ apiVersion: '2021-03-25' })

function myAsyncSlugifier(input) {
  const query = '*[_id == $id][0]'
  const params = { id: input._ref }
  // eslint-disable-next-line consistent-return
  return client.fetch(query, params).then((doc) => {
    if (doc.title) {
      return doc.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
    }
    if (doc.label) {
      return doc.label.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
    }
  })
}

export default {
  name: 'Route',
  type: 'document',
  title: 'Sti',
  titleEN: 'Landing page routes',
  icon: MdLink,
  initialValue: {
    useSiteTitle: false,
  },
  fieldsets: [
    {
      title: 'Page',
      name: 'page',
      description: 'Slett sti eller ekstern lenke for å lenke til en side eller tekst.',
      options: { collapsible: true, collapsed: false },
    },
    {
      title: 'Link',
      name: 'paths',
      description: 'Slett referansen til siden for legge til en sti eller ekstern lenke.',
      options: { collapsible: true, collapsed: false }
    },
  ],
  fields: [
    {
      name: 'label',
      title: 'Tittel',
      description: 'Lenkens tittel, om denne er tom brukes siden ellers tekstens tittel.',
      type: 'LocalizedString'
    },
    {
      name: 'page',
      title: 'Side',
      titleEN: 'Page',
      description: 'Siden du vil at skal vises på denne adressen. Siden må være publisert.',
      descriptionEN: 'The page you want to appear at this path. Remember it needs to be published.',
      fieldset: 'page',
      type: 'reference',
      to: [
        { type: 'Page' },
        { type: 'LinguisticDocument' },
      ],
      hidden: ({ parent, value }) => !value && (parent?.route || parent?.link),
      options: {
        filter: '__i18n_lang == $base',
        filterParams: { base: config.base },
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    {
      name: 'slug',
      title: 'Sti',
      titleEN: 'Path',
      description: 'Dette er adressen siden vil bli tilgjengelig på',
      descriptionEN: 'This is the website path the page will accessible on',
      fieldset: 'page',
      type: 'slug',
      hidden: ({ parent, value }) => !value && (parent?.route || parent?.link),
      validation: (Rule) =>
        Rule.custom((slug) => {
          if (slug && slug.current && slug.current === '/') {
            return 'Cannot be /'
          }
          return true
        }),
      options: {
        source: 'page',
        // Read more: https://www.sanity.io/docs/slug-type
        slugify: myAsyncSlugifier,
      },
    },
    {
      name: 'link',
      title: 'Ekstern lenke',
      titleEN: 'External link',
      description: 'Example: https://www.uib.no/ub',
      descriptionEN: 'Example: https://www.sanity.io',
      fieldset: 'paths',
      type: 'url',
      hidden: ({ parent, value }) => !value && (parent?.route || parent?.page)
    },
    {
      name: 'route',
      title: 'Sti til side i frontend',
      titleEN: 'Path',
      description: 'Referense til en "path" i frontend, som ikke er i Studioet. For eksempel "/abc".',
      descriptionEN: 'Reference to a path in the frontend, not available in the Studio',
      fieldset: 'paths',
      type: 'string',
      hidden: ({ parent, value }) => !value && (parent?.page || parent?.link)
    },
    {
      name: 'openGraph',
      title: 'Open graph',
      titleEN: 'Open graph',
      description: 'Disse vil bli brukt i "meta tags"',
      descriptionEN: 'These values populate meta tags',
      type: 'OpenGraph',
      hidden: ({ parent, value }) => !value && (parent?.page || parent?.link),
      options: {
        semanticSanity: {
          '@type': '@json'
        }
      },
    },
    /* {
      name: 'includeInSitemap',
      title: 'Inkluder i sitemap',
      titleEN: 'Include in sitemap',
      description: 'For søkemotorer. Vil bli generert i /sitemap.xml',
      descriptionEN: 'For search engines. Will be generateed to /sitemap.xml',
      type: 'boolean',
      options: {
        semanticSanity: {
          "@type": "xsd:boolean"
        }
      },
    }, */
    /* {
      name: 'disallowRobots',
      title: 'Disallow in robots.txt',
      titleEN: '"Disallow" i robots.txt',
      description: 'Skjul denne stien fra søkemoterer',
      descriptionEN: 'Hide this route for search engines like google',
      type: 'boolean',
      options: {
        semanticSanity: {
          "@type": "xsd:boolean"
        }
      },
    }, */
  ],
  preview: {
    select: {
      slug: 'slug.current',
      label: 'label',
      pageLabel: 'page.label',
      link: 'link'
    },
    prepare({ slug, label, pageLabel, link }) {
      return {
        title: coalesceLabel(label) || pageLabel,
        subtitle: link ?? ['/', slug].join(''),
      }
    },
  },
}
