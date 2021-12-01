# sanity-plugin-semantic-sanity

Convert Sanity Schemas to an OWL ontology and a JSON-LD Context. 

Why is this useful? You could create an API endpoint and dump the content of Sanity with a JSON-LD Context, convert the result to RDF and feed the result along with the ontology into a Sparql endpoint! 

## Installation

```
sanity install @seidhr/sanity-plugin-semantic-sanity
```

## Configuration

The plugin is configured with `<your-studio-folder>/config/@seidhr/sanity-plugin-semantic-sanity.json` with these defaults.

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

* `name` used as ontology title.
* `base` is the url used for every document and object in the dataset, `http://data.example.org/{_id}`.
* `vocab` defines the default prefix and url to use for the *classes* and *properties*, `http://example.org/model/0.1/{name}`.
* `prefixes` adds prefixes used in `options` in the schemas. **NB!** *You need to manually add all prefixes used.*

## Options

Add `options` to documents, objects and properties. 

```json
{
  "options": {
    "semanticSanity": {
      "exclude": true,
      "@container": "@set",
      "@type": "@id",
      "@id": "URL",
      "domain": ["URL"],
      "range": ["URL"],
      "subClassOf": ["URL"],
      "subPropertyOf": ["URL"]
    }
  }
}
```

### exclude

* Type: `boolean`
* Default: `false`

Use if this document, object or property should be excluded from the OWL ontology and the JSON-LD context.

### @container

* Type: `string`
* Default: `undefined`

`@container` defines if an array is unordered or ordered. If set, use `@set` or `@list`.

### @type

* Type: `string`
* Default: `undefined`

If set, use `@id` for a relationship using a URI or `@json` to capture more complex property value as just JSON. For strings you can type them using `xsd:date`, `xsd:dateTime`, `xsd:boolean` or other XML Schema datatypes.

### @id

* Type: `string`
* Default: `undefined`

Override the uri for the document, object or property, e.g. `schema:healthCondition` or `https://schema.org/healthCondition`.

### domain

* Type: `array`
* Default: `undefined`

Add domain for document, object or property, e.g. `schema:Patient` or `https://schema.org/Patient`. Domain is *not* a contraint. Adding `domain: "schema:Organization"` to a property means that for example a document of type `Person` using this property is also of the type `schema:Organization`.

### range

* Type: `array`
* Default: `undefined`

Add range for document, object or property, e.g. `ex:MedicalCondition` or `http://exmple.org/MedicalCondition`. Range is *not* a contraint. Adding `range: "ex:Sauce"` to a property means that for example the document of type `ex:Meat` that is the target of this property is also of the type `ex:Sauce`.

### subClassOf

* Type: `array`
* Default: `undefined`

Add subClassOf for document or object, e.g. schema:Person or a URI

### subPropertyOf

* Type: `array`
* Default: `undefined`

Add subPropertyOf for propery, e.g. schema:memberOf or a URI

## Issues

`semantic-sanity` is not thoroughly tested so all feedback is most welcome! [Submit issue](https://github.com/seidhr/muna/issues)

## License

MIT © Tarje Lavik
See LICENSE
