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
  "base": "http://data.example.org/",
  "vocab": {
    "prefix": "ex",
    "uri": "http://example.org/model/0.1/"
  }
}
```

`base` is the url used for every document and object in the dataset. `vocab` defines the default prefix and url to use for the *classes* and *properties*.

## Options

Add `options` to documents, objects and propertis.

```
options: {
  exclude: false | true
  jsonld: {
    context: {
      '@container': '@set' | '@list',
      '@type': '@id' | '@json',
      '@id': '[Some URL]'
    }
  }
}
```

## License

MIT © Tarje Lavik
See LICENSE
