# sanity-plugin-muna-schemas

Muna or ᛗᚢᚾᚨ means remember in norse. Muna is a schema for the Sanity Studio that enables detailed descriptions of cultural heritage objects and knowledge about their contexts as well as pages about them (or anything else really.) 

Muna is inspired by CIDOC-CRM and linked.art. The goal is to enable anyone to describe objects without a costly application or infrastructure. Muna tries to combine the expressiveness of CIDOC-CRM and the customizable editor Sanity Studio. Objects can connected to events, actors, reports and loads more.

## Installation

```
sanity install @seidhr/sanity-plugin-muna-schemas

# Install necessary plugins
sanity install @seidhr/sanity-plugin-timespan-input
sanity install @sanity/code-input 
sanity install @sanity/document-internationalization 
sanity install @sanity/language-filter 
sanity install @sanity/hierarchical-document-list
sanity install table 
sanity install iframe-pane 
sanity install documents-pane
yarn add react-icons
```

This schema _depends_ on `config:@sanity/document-internationalization` so it is important to set up this plugin!

```json
{
    "idStructure": "delimiter",
    "referenceBehavior": "strong",
    "base": "en",
    "languages": [
        {
            "id": "en",
            "title": "English",
            "isDefault": true
        },
        {
            "id": "no",
            "title": "Norsk"
        }
    ]
}
```

TODO: More detailed installation instructions for `document-internalization` and `language-filter`.

<!-- ## Configuration

The plugin can be configured through `<your-studio-folder>/config/muna-schemas.json`:

```json
{
  "add-config": "here"
}
``` -->

## License

MIT © Tarje Sælen Lavik
See LICENSE