# sanity-plugin-semantic-sanity

Convert Sanity Schemas to an OWL ontology and a JSON-LD Context. 

Why is this useful? You could create an API endpoint and dump the content of Sanity with a JSON-LD Context, convert the result to RDF and feed the result along with the ontology into a Sparql endpoint! 

## Installation

```
sanity install semantic-sanity
```

## Configuration

The plugin is configured with `<your-studio-folder>/config/semantic-sanity.json` with these defaults.

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

* `base` is the url used for every document and object in the dataset, `http://data.example.org/{_id}`.
* `vocab` defines the default prefix and url to use for the *classes* and *properties*, `http://example.org/model/0.1/{name}`.
* `prefixes` adds prefixes used in `options`. **NB!** *You need to manually add all prefixes used.*

## Options

Add `options` to documents, objects and properties. 

```json
{
  "options": {
    "semanticSanity": {
      "exclude": true, // default: false
      "@container": "@set", // if set, use "@set" or "@list"
      "@type": "@id" | "@json", // if set, use "@id" for a relationship or "@json" to capture property value
      "@id": "URL", // Override the uri for the class or property, e.g. schema:healthCondition
      "domain": ["URL"], // Add domain for class or property, e.g. schema:Patient
      "range": ["URL"], // Add range for class or property, e.g. ex:MedicalCondition
      "subClassOf": ["URL"], // Add subClassOf for class or property, e.g. schema:Person
      "subPropertyOf": ["URL"] // Add subPropertyOf for class or property, e.g. schema:memberOf
    }
  }
}
```

## License

MIT © Tarje Lavik
See LICENSE
