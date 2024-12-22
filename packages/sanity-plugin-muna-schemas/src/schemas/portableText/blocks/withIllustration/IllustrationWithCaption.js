export default {
  type: 'object',
  name: 'IllustrationWithCaption',
  title: 'Illustrasjon med bildetekst',
  titleEN: 'Illustration with caption',
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
      name: 'view',
      title: 'Visningsvalg',
      titleEN: 'View choice',
      description: 'Velg om bildet skal vises i sin helhet eller dekke et område. "Vis hele bildet" er standard.',
      type: 'string',
      initialValue: 'contain',
      options: {
        list: [
          { title: 'Vis hele bildet', value: 'contain' },
          { title: 'Dekk områder (kan føre til beskjæring)', value: 'cover' },
        ],
      },
    },
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Tekst',
      titleEN: 'Text',
      type: 'simpleBlockContent',
    },
    {
      name: 'source',
      title: 'Kilde',
      description: 'Legg til kilde eller kreditering',
      titleEN: 'Source',
      type: 'simpleBlockContent',
    },
    {
      name: 'illustration',
      title: 'Illustrasjonsbilde',
      titleEN: 'Illustration',
      type: 'Illustration',
    },
  ],
  preview: {
    select: {
      title: 'label',
      media: 'illustration',
      disabled: 'disabled',
    },
    prepare({ title, media, disabled }) {
      return {
        title: title,
        subtitle: `${disabled ? 'Avslått: ' : ''}Illustrasjon`,
        media: media?.image,
      }
    },
  },
}
