/* 
  Used in Quote section
*/
export default {
  name: 'quoteBlock',
  type: 'array',
  title: 'Quote',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [
        {title: 'Numbered', value: 'number'},
        {title: 'Bulleted', value: 'bullet'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
      },
    },
  ],
  options: {
    semanticSanity: {
      exclude: true
    }
  },
}
