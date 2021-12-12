import { labelSingleton } from "../props"

/* TODO Fix language
 */

export default {
  name: 'ImageCompare',
  type: 'object',
  title: 'Compare images',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fields: [
    labelSingleton,
    {
      name: 'before',
      title: 'Before',
      type: 'array',
      of: [{
        type: 'DigitalImageObject'}, 
        {
          type: 'reference', 
          to: [{
            type: 'HumanMadeObject'}
          ]
      }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'after',
      title: 'After',
      type: 'array',
      of: [{
        type: 'DigitalImageObject'}, 
        {
          type: 'reference', 
          to: [{
            type: 'HumanMadeObject'}
          ]
      }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Bildetekst',
      titleEN: 'Caption',
      type: 'LocaleString',
    },
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: label,
      }
    },
  },
}
