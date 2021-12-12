import { FaProjectDiagram } from 'react-icons/fa'
import { editorialState, accessState, label, timespan, referredToBy, identifiedBy } from '../props'
import { coalesceLabel } from '../helpers'

export default {
  name: 'Project',
  type: 'document',
  title: 'Project',
  icon: FaProjectDiagram,
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
      name: 'relations',
      title: 'Relations to other stuff',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    editorialState,
    accessState,
    label,
    {
      name: 'active',
      title: 'Pågående?',
      titleEN: 'Ongoing?',
      type: 'boolean',
      fieldset: 'minimum',
      initialValue: true,
      options: {
        semanticSanity: {
          "@type": "xsd:boolean"
        }
      },
    },
    {
      ...identifiedBy,
      fieldset: 'minimum',
    },
    {
      ...referredToBy,
      fieldset: 'minimum',
    },
    {
      ...timespan,
      fieldset: 'minimum',
    },
    {
      name: 'isAbout',
      title: 'Omhandler',
      titleEN: 'About',
      description: 'Which collection(s) or object(s) is this project was about.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'HumanMadeObject' },
            { type: 'Collection' },
            { type: 'Actor' },
          ],
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
      name: 'consistsOf',
      title: 'Underprosjekt',
      titleEN: 'Sub projects',
      type: 'array',
      of: [{ type: 'Project' }],
      options: {
        editModal: 'fullscreen',
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    {
      name: 'documentedIn', // TODO: fix
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
      type: 'hasType.0.label',
      title: 'label',
      blocks: 'referredToBy.0.body',
      published: 'accessState',
      active: 'active',
    },
    prepare(selection) {
      const { type, title, blocks, published, active } = selection
      const block = (blocks || []).find((block) => block._type === 'block')
      const secret = published === 'secret' ? '🔒' : ''
      const a = active ? 'Active' : 'Completed'

      return {
        title: coalesceLabel(title),
        subtitle: secret + ' ' + a + (coalesceLabel(type) || ''),
        description: block
          ? block.children
            .filter((child) => child._type === 'span')
            .map((span) => span.text)
            .join('')
          : 'No description',
      }
    },
  },
  orderings: [
    {
      title: 'Title, A-Å',
      name: 'title',
      by: [{ field: 'label', direction: 'desc' }],
    },
    {
      title: 'Title, Å-A',
      name: 'title',
      by: [{ field: 'label', direction: 'asc' }],
    },
  ],
}
