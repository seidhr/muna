import { TextPreview } from "../../../previews/TextPreview"

export default {
  name: 'TextBlock',
  title: 'Text',
  type: 'object',
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
      name: 'label',
      title: 'Tittel',
      titleEN: 'Heading',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'simpleBlockContent',
    },
  ],
  preview: {
    select: {
      title: 'label',
      content: 'content',
      disabled: 'disabled',
    },
    prepare({ title, content }) {
      return {
        title: title ? title : '',
        content: content ? content : '',
        type: 'Text'
      }
    },
    component: TextPreview,
  },
}
