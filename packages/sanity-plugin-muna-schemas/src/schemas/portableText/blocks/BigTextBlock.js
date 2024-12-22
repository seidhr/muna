import { TextPreview } from '../../../previews/TextPreview'

export default {
  name: 'BigTextBlock',
  type: 'object',
  title: 'Stor tekst',
  titleEN: 'Big text',
  description: 'Stor tekst. Centered. Keep it short to max 2-3 paragraphs.',
  descriptionEN: 'A big text. Centered. Keep it short to max 2-3 paragraphs.',
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
      title: 'Tekst',
      titleEN: 'Text',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
      disabled: 'disabled',
    },
    prepare({ title, content }) {
      return {
        title: title ? title : '',
        content: content ? content : '',
        type: 'Big text'
      }
    },
    component: TextPreview,
  },
}
