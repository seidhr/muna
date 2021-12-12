import { labelSingleton } from "../../props"

export default {
  name: 'SingleLevelChart',
  type: 'object',
  title: 'Singel level chart',
  titleEN: 'Single level chart',
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
      name: 'type',
      title: 'Type diagram',
      titleEN: 'Diagram type',
      options: {
        list: [
          {title: 'Pai', value: 'pie'}
        ]
      },
      initialValue: 'pie',
      type: 'string',
    },
    labelSingleton,
    {
      name: 'caption',
      title: 'Tekst',
      titleEN: 'Text',
      type: 'blockContent',
    },
    {
      name: 'data',
      title: 'Data',
      titleEN: 'Data',
      options: {
        language: 'json'
      },
      type: 'code',
    },
  ],
  preview: {
    select: {
      title: 'label',
      disabled: 'disabled',
    },
    prepare({title, disabled}) {
      return {
        title: title ? title : 'Unnamed chart',
        subtitle: disabled ? disabled : '',
      }
    },
  },
}
