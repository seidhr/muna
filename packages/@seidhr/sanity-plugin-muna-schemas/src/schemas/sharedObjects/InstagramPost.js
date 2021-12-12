import InstagramPreview from '../previews/InstagramPreview'

/* TODO: move?
 */

export default {
  name: 'InstagramPost',
  type: 'object',
  title: 'Instagram innlegg',
  titleEN: 'Instagram Post',
  fields: [
    {
      name: 'url',
      title: 'URL',
      titleEN: 'URL',
      description: 'Finn et Instagram innlegg i en nettleser og kopier nettadressen',
      descriptionEN: 'Visit an Instagram post in a browser and copy the URL',
      type: 'url',
    },
  ],
  preview: {
    select: {url: 'url'},
    component: InstagramPreview,
  },
}
