import config from 'config:@seidhr/sanity-plugin-semantic-sanity';
import { getConfig } from './getConfig';

/**
 * Map Sanity schema types to XSD
 */
export const datatypeMap = {
  string: 'xsd:string',
  text: 'xsd:string',
  boolean: 'xsd:boolean',
  number: 'xsd:float',
  datetime: 'xsd:dateTime',
  date: 'xsd:date',
  uri: 'xsd:anyURI',
}

/**
 * Build the ontology from source schemas
 * @param {*} source 
 * @returns 
 */
export const getOntology = (source) => {
  const { ontologyName, vocab, vocabUri, base, prefixes } = getConfig()

  const classes = source.filter(type => ['document', 'object'].includes(type.type)).map(type => {
    return {
      '@id': type.options?.semanticSanity?.['@id'] ? type.options.semanticSanity['@id'] : `${base}${type.name}`,
      '@type': 'owl:Class',
      'label': type.name,
      'comment': type.description ? type.description : undefined,
      ...(type.options?.semanticSanity?.subClassOf ? { subClassOf: type.options.semanticSanity.subClassOf } : undefined)
    }
  })

  /**
   * First get all fields from all documents
   */
  let allFields = []
  source.map(type => {
    type.fields.filter(field => field.options?.semanticSanity?.exclude != true).forEach(field => {
      const data = {
        ...field,
        '@id': field.options?.semanticSanity?.['@id'] ? field.options.semanticSanity['@id'] : `${base}${field.name}`,
        '@type': field.options?.semanticSanity?.['@type'] === '@id' ? 'owl:ObjectProperty' : 'owl:DatatypeProperty',
      }
      allFields.push(data)
    })
  })

  /**
   * Push unique props to array
   */
  let properties = []

  allFields.forEach(property => {
    // Initial prop
    const initProp = {
      '@id': property['@id'],
      '@type': property['@type'],
      'label': property.name,
      ...(property['@type'] === 'owl:DatatypeProperty' && datatypeMap[property.type] ? { range: [datatypeMap[property.type]] } : undefined)
    }

    // Check if prop is initialized
    if (!properties.find(p => p['@id'] == property['@id'])) {
      properties.push(initProp)
    }

    // Push ranges when we have a reference. TODO: fix bad code :-(
    const pushRangeArraysOfObjects = (id, type, arr) => {
      if (properties.find(p => {
        if (p['@id'] == id) {
          arr.forEach(
            r => {
              console.log(r)
              if (!p[type]) {
                p[type] = []
              }
              if (!p[type].find(s => s === r)) {
                p[type].push(r)
              }
            }
          )
        }
      })) { }
    }

    if (property.options?.semanticSanity?.domain) {
      pushRangeArraysOfObjects(property['@id'], 'domain', property.options.semanticSanity.domain)
    }
    if (property.options?.semanticSanity?.range) {
      pushRangeArraysOfObjects(property['@id'], 'range', property.options.semanticSanity.range)
    }
    if (property.options?.semanticSanity?.subClassOf) {
      pushRangeArraysOfObjects(property['@id'], 'subClassOf', property.options.semanticSanity.subClassOf)
    }
    if (property.options?.semanticSanity?.subPropertyOf) {
      pushRangeArraysOfObjects(property['@id'], 'subPropertyOf', property.options.semanticSanity.subPropertyOf)
    }
  })

  const ontology = {
    '@context': {
      '@version': 1.1,
      '@base': config.base ? config.base : undefined,
      [vocab]: vocabUri,
      ...prefixes,
      'defines': {
        '@reverse': 'rdfs:isDefinedBy'
      },
      'label': {
        '@id': 'rdfs:label',
      },
      'comment': {
        '@id': 'rdfs:comment',
      },
      'domain': {
        '@id': 'rdfs:domain',
        '@type': '@id'
      },
      'range': {
        '@id': 'rdfs:range',
        '@type': '@id'
      },
      'subClassOf': {
        '@id': 'rdfs:subClassOf',
        '@type': '@id'
      },
      'subPropertyOf': {
        '@id': 'rdfs:subPropertyOf',
        '@type': '@id'
      }
    },
    '@id': vocabUri,
    '@type': 'owl:Ontology',
    'label': ontologyName,
    'defines': [
      ...classes,
      ...properties
    ]
  };

  return ontology
}

