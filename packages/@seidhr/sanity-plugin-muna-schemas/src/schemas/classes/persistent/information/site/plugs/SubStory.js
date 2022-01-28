export default {
  name: 'SubStory',
  type: 'object',
  title: 'Underfortelling',
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
      title: 'Merkelapp',
      titleEN: 'Label',
      description: 'Brukes over tittelen',
      descriptionEN: 'Used above the title',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Tittel',
      titleEN: 'Heading',
      type: 'string',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      titleEN: 'Tagline',
      description: 'Tagline under tittelen. Bør ikke være lengre en to korte avsnitt.',
      descriptionEN: 'Tagline under the title. Should not be longer than two short paragraphs.',
      type: 'simpleBlockContent',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    },
    {
      name: 'illustration',
      title: 'Illustrasjonsbilde',
      titleEN: 'Illustration',
      description: 'Bakgrunnsbilde under teksten',
      descriptionEN: 'Illustration below the text',
      type: 'IllustrationWithCaption',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'label',
      block: 'content.0',
      media: 'illustration.illustration',
      disabled: 'disabled',
    },
    prepare({ title, media, disabled, block }) {
      const description = block
        ? block.children
          .filter((child) => child._type === 'span')
          .map((span) => span.text)
          .join('')
        : ''

      return {
        title: `${disabled ? 'Avslått: ' : ''}${title ?? description}`,
        subtitle: 'Underfortelling',
        media: media?.image,
      }
    },
  },
}
