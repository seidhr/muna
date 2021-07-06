# sanity-plugin-semantic-sanity

Convert Sanity Schemas to an OWL ontology and a JSON-LD Context!

## Installation

```
sanity install semantic-sanity
```

## Configuration

The plugin can be configured through `<your-studio-folder>/config/semantic-sanity.json`:

```json
{
  "name": "Example ontology",
  "base": "http://data.example.org/",
  "vocab": {
    "prefix": "ex",
    "uri": "http://example.org/model/0.1/"
  },
  "prefixes": {
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "owl": "http://www.w3.org/2002/07/owl#"
  }
}
```

`base` is the url used for every document and object in the dataset. `vocab` defines the default prefix and url to use for the *classes* and *properties*.

## Options

Add `options` to documents, objects and propertis.

```
{
  options: {
    semanticSanity: {
      'exclude': false | true,
      '@container': '@set' | '@list',
      '@type': '@id' | '@json',
      '@id': 'Some URL',
      'domain': ['Some URL'],
      'range': ['Some URL]',
      'subClassOf': ['Some URL]',
      'subPropertyOf': ['Some URL']
    }
  }
}
```

## License

MIT © Tarje Lavik
See LICENSE
