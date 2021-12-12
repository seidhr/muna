import React from 'react'
import { FaPaperclip } from 'react-icons/fa'
import ExternalLinkRenderer from './ExternalLinkRenderer'
import FootnoteRenderer from './FootnoteRenderer'

const highlightIcon = () => <span style={{ fontWeight: 'bold' }}>H</span>
const highlightRender = (props) => <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>
const footnoteIcon = () => <span style={{ fontWeight: 'bold' }}>F</span>

export default {
  name: 'blockContent',
  title: 'Excerpt',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
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
            title: 'External link',
            blockEditor: {
              render: ExternalLinkRenderer
            },
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                description: 'Read https://css-tricks.com/use-target_blank/',
                type: 'boolean',
                initialValue: true
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            blockEditor: {
              icon: FaPaperclip
            },
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  { type: 'Actor' },
                  { type: 'HumanMadeObject' },
                  { type: 'Collection' },
                  { type: 'Event' },
                  { type: 'Material' },
                  { type: 'Timeline' },
                  // other types you may want to link to
                ],
              },
            ],
          },
          {
            name: 'footnote',
            type: 'object',
            title: 'Footnote',
            blockEditor: {
              icon: footnoteIcon,
              render: FootnoteRenderer
            },
            fields: [
              {
                name: 'text',
                type: 'array',
                of: [{ type: 'block' }]
              }
            ]
          }
        ],
      },
    },
    {
      type: 'reference',
      title: 'Insert internal object',
      to: [
        { type: 'Actor' },
        { type: 'HumanMadeObject' },
        { type: 'Collection' },
        { type: 'Event' },
        { type: 'Place' },
        { type: 'Material' },
        { type: 'Timeline' },
      ],
    },
    { type: 'PageHeader' },
    { type: 'Hero' },
    { type: 'BigText' },
    { type: 'SingleObject' },
    { type: 'MiradorGallery' },
    { type: 'IllustrationWithCaption' },
    { type: 'Gallery' },
    { type: 'SubStory' },
    { type: 'ActorCollection' },
    { type: 'EventSection' },
    { type: 'InstagramPost' },
    { type: 'ImageCompare' },
    { type: 'SingleLevelChart' },
    { type: 'Geojson' },
    { type: 'Quote' },
    { type: 'Table' },
    { type: 'TimelineSection' },
    { type: 'TwoColumn' },
    { type: 'Video' },
    { type: 'Social' },
    { type: 'Iframe' },
    { type: 'ExhibitionElement' },
  ],
  options: {
    semanticSanity: {
      exclude: true
    }
  },
}
