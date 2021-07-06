import _ from 'lodash';
import config from 'config:semantic-sanity';

/**
 * Order the schemas for simpler diffs
 */
export const orderSchemas = (schema) => {
  const result = _.orderBy(schema, ['name'], ['asc'])
  return result
}

export const getConfig = () => {
  const ontologyName = config.name
  const vocab = config.vocab?.prefix ? config.vocab.prefix : '@vocab';
  const vocabUri = config.vocab?.uri ? config.vocab.uri : 'http://example.org/model/0.1/';
  
  // If vocab is set to '@vocab' then we do not add a prefix to '@id' values, because '@base' sets prefix for all
  const base = config.vocab?.prefix && config.vocab?.prefix != '@vocab' ? `${config.vocab.prefix}:` : ''
  const prefixes = config.prefixes

  return {ontologyName, vocab, vocabUri, base, prefixes}
}

/**
 * Create default context
 * @returns {object}
 */
export const getContext = () => {
  const {vocab, vocabUri, base, prefixes} = getConfig()
  
  // Default context
  const context = {
    '@context': {
      '@version': 1.1,
      '@base': config.base ? config.base : undefined,
      [vocab]: vocabUri,
      ...prefixes,
      _id: '@id',
      _ref: '@id',
      id: '@id',
      _type: '@type',
      type: '@type',
      '_rev': `${vocabUri}revisionId`
    },
  };

  return {context, base}
}

/**
 * Map props to '@id', '@container' and '@type'
 * @param {array} fields 
 * @returns {object}
 */
export const getFields = (fields, base) => {
  if (!fields) return null;

  const result = fields.map((field) => {
    if(field.options?.semanticSanity?.exclude) return

    return {
      [field.name]: {
        '@id': field.options?.semanticSanity?.['@id'] ? field.options.semanticSanity['@id'] : `${base}${field.name}`,
        '@container': field.options?.semanticSanity?.['@container'] ? field.options.semanticSanity['@container'] : undefined,
        '@type': field.options?.semanticSanity?.['@type'] ? field.options.semanticSanity['@type'] : field.type === 'reference' ? `${base}${field.name}` : undefined,
      },
    };
  });
  return Object.assign(...result);
};

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
  const {ontologyName, vocab, vocabUri, base, prefixes} = getConfig()

  const classes = source.map(type => {
    return {
      '@id': type.options?.semanticSanity?.['@id'] ? type.options.semanticSanity['@id'] : `${base}${type.name}`,
      '@type': 'owl:Class',
      'label': type.name,
      'comment': type.description ? type.description : undefined,
      ...(type.options?.semanticSanity?.subClassOf ? {subClassOf: type.options.semanticSanity.subClassOf} : undefined)
    }
  })

  /**
   * First get all fields and insert schema name as domain
   */
  let allFields = []
  source.map(type => {
    type.fields.forEach(field => {
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
      ...(property['@type'] === 'owl:DatatypeProperty' && datatypeMap[property.type] ? {range: [datatypeMap[property.type]]} : undefined)
    }
    
    // Check if prop is initialized
    if (!properties.find(p => p['@id'] == property['@id'])) {
      properties.push(initProp)
    }
    
    // Push ranges when we have a reference. TODO: fix bad code :-(
    const pushRangeArraysOfObjects = (id, type, arr) => {
      if (properties.find(p => {
        if(p['@id'] == id) {
          arr.forEach(
            r => {
              console.log(r)
              if(!p[type]) {
                p[type] = []
              }
              if (!p[type].find(s => s === r)) {
                p[type].push(r)
              }
            }
          )
        }
      })) {}
    }

    if(property.options?.semanticSanity?.domain) {
      pushRangeArraysOfObjects(property['@id'], 'domain', property.options.semanticSanity.domain)
    }
    if(property.options?.semanticSanity?.range) {
      pushRangeArraysOfObjects(property['@id'], 'range', property.options.semanticSanity.range)
    }
    if(property.options?.semanticSanity?.subClassOf) {
      pushRangeArraysOfObjects(property['@id'], 'subClassOf', property.options.semanticSanity.subClassOf)
    }
    if(property.options?.semanticSanity?.subPropertyOf) {
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

