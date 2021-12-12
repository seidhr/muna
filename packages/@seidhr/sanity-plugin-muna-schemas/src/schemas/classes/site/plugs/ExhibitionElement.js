export default {
  type: 'object',
  name: 'ExhibitionElement',
  title: 'Ustillingselement',
  titleEN: 'Exhibition element',
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
      name: 'forseesUseOf',
      title: 'Bruk designmal',
      titleEN: 'Forsees use of',
      type: 'reference',
      to: [{type: 'DesignOrProcedure'}],
    },
    {
      name: 'content',
      title: 'Tekst',
      titleEN: 'Text',
      type: 'simpleBlockContent',
    },
    {
      name: 'item',
      title: 'Objekt',
      titleEN: 'Item',
      type: 'reference',
      to: [{type: 'HumanMadeObject'}],
    },
    {
      name: 'illustration',
      title: 'Illustrasjonsbilde',
      titleEN: 'Illustration',
      description: 'Dersom illustrasjonsbilde benyttes, blir objektet ikke benyttet som illustrasjon.',
      type: 'Illustration',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'label',
      media: 'illustration',
      disabled: 'disabled',
    },
    prepare({title, media, disabled}) {
      return {
        title: title,
        subtitle: `${disabled ? 'Avslått: ' : ''}Ustillingselement`,
        media: media?.image,
      }
    },
  },
}
