export default {
  name: 'Person',
  title: 'Person',
  type: 'document',
  options: {
    semanticSanity: {
      'subClassOf': ['http://purl.org/biotop/biotop.owl#Human'],
    }
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'birth',
      title: 'Birth',
      type: 'Birth',
    },
    {
      name: 'parentOf',
      title: 'Parent',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'Person' }]
        }
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id',
          '@id': 'http://schema.org/parentOf',
          'domain': ['http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#BiologicalObject'],
          'range': ['http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#BiologicalObject'],
          'subPropertyOf': ['http://schema.org/parent'],
        }
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
  ]
}