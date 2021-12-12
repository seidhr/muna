import { TextPreview } from "../../components/preview/TextPreview"

export default {
  name: 'SvgTitle',
  type: 'object',
  title: 'SVG tittel',
  titleEN: 'SVG title',
  description: '',
  descriptionEN: '',
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
      name: 'title',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Tekst',
      titleEN: 'Text',
      type: 'code',
      options: {
        language: 'svg'
      }
    },
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
      disabled: 'disabled',
    },
    prepare({title, content}) {
      return {
        title: title ? title : '',
        content: content ? content : '',
        type: 'SVG tittel'
      }
    },
    component: TextPreview,
  },
}
