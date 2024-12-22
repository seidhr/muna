import { QuotePreview } from '../../../previews/QuotePreview'

export default {
  name: 'QuoteBlock',
  type: 'object',
  title: 'Quote',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      name: 'content',
      type: 'simpleBlockContent',
    },
    {
      name: 'credit',
      type: 'simpleBlockContent',
    },
  ],
  preview: {
    select: {
      content: 'content',
      credit: 'credit',
      disabled: 'disabled',
    },
    prepare({ content, credit }) {
      return {
        content: content ? content : '',
        credit: credit ? credit : '',
        type: 'Quote'
      }
    },
    component: QuotePreview,
  },
}
