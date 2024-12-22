
export const label = {
  name: 'label',
  title: 'Tittel',
  titleEN: 'Title',
  // description: (<span>Tittel. <Link target='blank' href={'https://muna.xyz/docs/model/properties#label'}><BsFillQuestionCircleFill /></Link></span>),
  // descriptionEN: (<span>Title. <Link target='blank' href={'https://muna.xyz/docs/model/properties#label'}><BsFillQuestionCircleFill /></Link></span>),
  type: 'LocalizedString',
  validation: (Rule) => Rule.required(),
  options: {
    semanticSanity: {
      '@id': 'rdfs:label',
      '@container': '@language'
    }
  },
};
