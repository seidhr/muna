import React from 'react'

const highlightIcon = () => <span style={{ fontWeight: 'bold' }}>H</span>
const highlightRender = (props) => <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>

export default {
  name: 'reportText',
  type: 'array',
  title: 'Excerpt',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Numbered', value: 'number' },
        { title: 'Bulleted', value: 'bullet' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          {
            title: 'Highlight',
            value: 'highlight',
            blockEditor: {
              icon: highlightIcon,
              render: highlightRender,
            },
          },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    },
    { type: 'DigitalObjectImage' },
    {
      type: 'reference',
      to: [
        { type: 'Actor' },
        { type: 'HumanMadeObject' },
        { type: 'Collection' },
        { type: 'Event' },
        { type: 'Place' },
        { type: 'Material' },
        { type: 'Measurement' },
      ],
    },
  ],
  options: {
    semanticSanity: {
      exclude: true
    }
  },
}
