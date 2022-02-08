import { FaProjectDiagram } from 'react-icons/fa'
import { coalesceLabel } from '../../../../helpers'
import { accessState, editorialState, label } from '../../../properties/datatype'
import { identifiedBy, referredToBy, timespan } from '../../../properties/object'

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
      name: 'core',
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
      fieldset: 'core',
      initialValue: true,
      options: {
        semanticSanity: {
          "@type": "xsd:boolean"
        }
      },
    },
    {
      ...identifiedBy,
      fieldset: 'core',
    },
    {
      ...referredToBy,
      fieldset: 'core',
    },
    {
      ...timespan,
      fieldset: 'core',
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
      type: 'hasType.0.label',
      title: 'label',
      blocks: 'referredToBy.0.body',
      published: 'accessState',
      active: 'active',
    },
    prepare(selection) {
      const { type, title, blocks, published, active } = selection
      const desc = (blocks || []).find((block) => block._type === 'block')
      const secret = published === 'secret' ? '🔒' : ''
      const a = active ? 'Active' : 'Completed'

      return {
        title: coalesceLabel(title),
        subtitle: `${secret} ${a} ${(coalesceLabel(type) || '')}`,
        description: desc
          ? desc.children
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
