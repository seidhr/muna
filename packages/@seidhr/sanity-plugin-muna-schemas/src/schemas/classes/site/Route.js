import {MdLink} from 'react-icons/md'
import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({apiVersion: '2021-03-25'})

function myAsyncSlugifier(input) {
  const query = '*[_id == $id][0]'
  const params = {id: input._ref}
  return client.fetch(query, params).then((doc) => {
    if(doc.title) {
      return doc.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
    }
    if(doc.label) {
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
      title: 'Visibility',
      name: 'visibility',
      options: { collapsible: true, collapsed: true}
    },
  ],
  fields: [
    {
      name: 'slug',
      title: 'Sti',
      titleEN: 'Path',
      description: 'Dette er adressen siden vil bli tilgjengelig på',
      descriptionEN: 'This is the website path the page will accessible on',
      type: 'slug',
      validation: (Rule) =>
        Rule.required().custom((slug) => {
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
      name: 'language',
      title: 'Språk',
      titleEN: 'Language',
      type: 'reference',
      to: [
        {type: 'Language'}
      ],
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    {
      name: 'page',
      title: 'Side',
      titleEN: 'Page',
      description: 'Siden du vil at skal vises på denne adressen. Siden må være publisert.',
      descriptionEN: 'The page you want to appear at this path. Remember it needs to be published.',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [
        {type: 'Page'},
        {type: 'LinguisticDocument'},
      ],
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    {
      name: 'useSiteTitle',
      title: 'Bruk nettsidens tittel?',
      titleEN: 'Use site title?',
      description:
        'Bruk nettsidens tittel som sidetittel istedenfor tittelen på siden på denne stien',
      descriptionEN:
        'Use the site settings title as page title instead of the title on the referenced page',
      type: 'boolean',
    },
    {
      name: 'openGraph',
      title: 'Open graph',
      titleEN: 'Open graph',
      description: 'Disse vil bli brukt i "meta tags"',
      descriptionEN: 'These values populate meta tags',
      type: 'OpenGraph',
      options: {
        semanticSanity: {
          '@type': '@json'
        }
      },
    },
    {
      name: 'includeInSitemap',
      title: 'Inkluder i sitemap',
      titleEN: 'Include in sitemap',
      description: 'For søkemotorer. Vil bli generert i /sitemap.xml',
      descriptionEN: 'For search engines. Will be generateed to /sitemap.xml',
      fieldset: 'visibility',
      type: 'boolean',
      options: {
        semanticSanity: {
          "@type": "xsd:boolean"
        }
      },
    },
    {
      name: 'disallowRobots',
      title: 'Disallow in robots.txt',
      titleEN: '"Disallow" i robots.txt',
      description: 'Skjul denne stien fra søkemoterer',
      descriptionEN: 'Hide this route for search engines like google',
      fieldset: 'visibility',
      type: 'boolean',
      options: {
        semanticSanity: {
          "@type": "xsd:boolean"
        }
      },
    },
  ],
  preview: {
    select: {
      title: 'slug.current',
      subtitle: 'page.title',
      label: 'page.label',
      language: 'language.identifiedByISO6393'
    },
    prepare({title, subtitle, label, language}) {
      const lang = language ? `${language}/` : ''
      return {
        title: ['/', lang, title].join(''),
        subtitle: subtitle ?? label
      }
    },
  },
}
