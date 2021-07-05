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
  const vocab = config.vocab?.prefix ? config.vocab.prefix : '@vocab';
  const vocabUri = config.vocab?.uri ? config.vocab.uri : 'http://example.org/model/0.1/';
  
  // If vocab is set to '@vocab' then we do not add a prefix to '@id' values, because '@base' sets prefix for all
  const base = config.vocab?.prefix && config.vocab?.prefix != '@vocab' ? `${config.vocab.prefix}:` : ''

  return {vocab, vocabUri, base}
}

/**
 * Create default context
 * @returns {object}
 */
export const getContext = () => {
  const {vocab, vocabUri, base} = getConfig()
  
  // Default context
  const context = {
    '@context': {
      '@version': 1.1,
      '@base': config.base ? config.base : undefined,
      [vocab]: vocabUri,
      'crm': 'http://www.cidoc-crm.org/cidoc-crm/',
      'xsd': 'http://www.w3.org/2001/XMLSchema#',
      'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
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
 * @param {object} prop 
 * @returns {object}
 */
const getProps = (prop, base) => {
  const result = {
    '@id': prop.options?.jsonld?.context?.['@id'] ? prop.options.jsonld.context?.['@id'] : `${base}${prop.name}`,
    '@container': prop.options?.jsonld?.context?.['@container'] ? prop.options.jsonld.context?.['@container'] : undefined,
    '@type': prop.options?.jsonld?.context?.['@type'] ? prop.options.jsonld.context?.['@type'] : prop.type === 'reference' ? `${base}${prop.name}` : undefined,
  };
  
  return result;
};

/**
 * Return fields as key with local '@context' object
 * @param {array} fields 
 * @returns {object}
 */
export const getFields = (fields, base) => {
  if (!fields) return null;

  const result = fields.map((field) => {
    if(field.options?.jsonld?.exclude) return

    return {
      [field.name]: getProps(field, base),
    };
  });
  return Object.assign(...result);
};

/**
 * Return fields as key with local '@context' object
 * @param {array} fields 
 * @returns {object}
 */
export const getOntologyFields = (fields, base) => {
  if (!fields) return null;

  const result = fields.map((field) => {
    if(field.options?.jsonld?.exclude) return

    return {
      [field.name]: getProps(field, base),
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
export const getOntolgy = (source) => {
  const {vocab, vocabUri, base} = getConfig()

  const classes = source.map(type => {
    return {
      '@id': type.options?.jsonld?.context?.['@id'] ? type.options.jsonld.context?.['@id'] : `${base}${type.name}`,
      '@type': 'owl:Class',
      'label': type.name,
      'comment': type.description ? type.description : undefined
    }
  })

  const getClassID = (label) => {
    const match = _.find(classes, { 'label': label} )
    if(!match?.['@id']) {
      console.warn(`No class match on ${label}!`)
    }
    return match ? match['@id'] : label
  }

  /**
   * First get all fields and insert schema name as domain
   */
  let allFields = []
  source.map(type => {
    type.fields.forEach(field => {
      const data = {
        ...field,
        '@id': field.options?.jsonld?.context?.['@id'] ? field.options.jsonld.context?.['@id'] : `${base}${field.name}`,
        '@type': field.options?.jsonld?.context?.['@type'] === '@id' ? 'owl:ObjectProperty' : 'owl:DatatypeProperty',
        domain: type.options?.jsonld?.context?.['@id'] ? type.options.jsonld.context?.['@id'] : `${base}${type.name}`
      }
      allFields.push(data)
    })
  })

  /**
   * Push unique props to array
   */
  let properties = []

  allFields.forEach(property => {
    // console.log(property)
    // Initial prop
    const initProp = {
      '@id': property['@id'],
      '@type': property['@type'],
      'label': property.name,
      domain: [],
      ...(property['@type'] === 'owl:ObjectProperty' && {range: []}),
      ...(property['@type'] === 'owl:DatatypeProperty' && datatypeMap[property.type] ? {range: [datatypeMap[property.type]]} : undefined)
    }
    
    // Check if prop is initialized
    if (!properties.find(p => p['@id'] == property['@id'])) {
      properties.push(initProp)
    }
    
    // Push domains. TODO: fix bad code :-(
    if (properties.find(p => {
      if(p['@id'] == property['@id']) {
        p.domain.push(property.domain)
      }
    })) {}
  
    // Push ranges when we have a reference. TODO: fix bad code :-(
    const pushRangeArraysOfObjects = (id, of) => {
      if(of) {
        if (properties.find(p => {
          if(p.range && p['@id'] == id) {
            of.forEach(
              r => {
                const classID = getClassID(r.type)
                if (!p.range.find(s => s === classID))
                  p.range.push(classID)
              }
            )
          }
        })) {}
      }
    }

    // Push ranges when we have a reference. TODO: fix bad code :-(
    const pushRangeReferences = (id, to) => {
      if(to) {
        const range = [..._.map(to, 'type')]
        if (properties.find(p => {
          if(p.range && p['@id'] == id) {
            range.forEach(
              r => {
                const classID = getClassID(r)
                if (!p.range.find(s => s === classID))
                  p.range.push(classID)
              }
            )
          }
        })) {}
      }
    }

    // Push ranges when we have a reference. TODO: fix bad code :-(
/*     const pushRangeDatatype = (id, datatype) => {
      if(!datatype) {
        return null
      }
      console.log(id, datatype)
      if(datatype) {
        if (properties.find(p => {
          if(p.range && p['@id'] == id) {
            if (!p.range.find(s => s === datatype)) {
              p.range.push(datatype)
            }
          }
        })) {}
      }
    }

    if(property['@type' === 'owl:DatatypeProperty']) {
      pushRangeDatatype(property['@id'], property.type)
    } */

    if(property['@type' === 'owl:ObjectProperty']) {
      pushRangeReferences(property['@id'], property.to)
    }
    
    if(property.type === 'reference') {
      pushRangeArraysOfObjects(property['@id'], property.to)
    }

    if(property.type === 'array' && !_.some(property.of, ['type', 'reference'])) {
      pushRangeArraysOfObjects(property['@id'], property.of)
    }
  
    // Push arrays of references
    if(property.type === 'array' && property.of) {
      property.of.forEach(obj => {
        pushRangeReferences(property['@id'], obj.to)
      })
    }
  })

  const ontology = {
    '@context': {
      '@version': 1.1,
      'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
      'owl': 'http://www.w3.org/2002/07/owl#',
      'crm': 'http://www.cidoc-crm.org/cidoc-crm/',
      [vocab]: vocabUri,
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
      }
    },
      '@id': vocabUri,
      '@type': 'owl:Ontology',
      'label': 'Muna ontology',
      'defines': [
        ...classes,
        ...properties
      ]
    };

  return ontology
}

