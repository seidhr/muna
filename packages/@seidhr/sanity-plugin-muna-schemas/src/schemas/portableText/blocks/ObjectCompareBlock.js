import { label } from "../../properties/datatype"

export default {
  name: 'ObjectCompareBlock',
  type: 'object',
  title: 'Compare images',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fields: [
    label,
    {
      name: 'caption',
      title: 'Bildetekst',
      titleEN: 'Caption',
      type: 'LocalizedString',
    },
    {
      name: 'before',
      title: 'Before',
      type: 'array',
      of: [
        {
          type: 'DigitalObjectImage'
        },
        {
          type: 'reference',
          to: [{
            type: 'HumanMadeObject'
          }
          ]
        }
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'after',
      title: 'After',
      type: 'array',
      of: [{
        type: 'DigitalObjectImage'
      },
      {
        type: 'reference',
        to: [{
          type: 'HumanMadeObject'
        }
        ]
      }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title,
      }
    },
  },
}
