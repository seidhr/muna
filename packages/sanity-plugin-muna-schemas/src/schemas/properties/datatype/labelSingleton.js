
export const labelSingleton = {
  name: 'label',
  title: 'Tittel',
  titleEN: 'Title',
  // description: (<span>Tittel. <Link target='blank' href={'https://muna.xyz/docs/model/properties#label'}><BsFillQuestionCircleFill /></Link></span>),
  // descriptionEN: (<span>Title. <Link target='blank' href={'https://muna.xyz/docs/model/properties#label'}><BsFillQuestionCircleFill /></Link></span>),
  type: 'string',
  validation: (Rule) => Rule.required(),
  options: {
    semanticSanity: {
      '@id': 'rdfs:label'
    }
  },
};
