import { QuotePreview } from '../../components/preview/QuotePreview'

export default {
  name: 'Quote',
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
      type: 'quoteBlock',
    },
    {
      name: 'credit',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      content: 'content',
      credit: 'credit',
      disabled: 'disabled',
    },
    prepare({content, credit}) {
      return {
        content: content ? content : '',
        credit: credit ? credit : '',
        type: 'Quote'
      }
    },
    component: QuotePreview,
  },
}
