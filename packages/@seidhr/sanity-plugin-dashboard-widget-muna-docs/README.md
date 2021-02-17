# sanity-plugin-dashboard-widget-muna-docs

Just links to Muna documentation

## Installation

```
sanity install dashboard-widget-muna-docs
```

Add this code to your dashboardConfig.js:

```js
    {
      name: 'muna-docs-widget',
      layout: {
        width: 'small'
      },
    },
```

Example sanity.json:

```json
{
  "plugins": [
    "@sanity/base",
    "@sanity/components",
    "@sanity/default-layout",
    "@sanity/default-login",
    "@sanity/dashboard",
    "@sanity/desk-tool",
    "@seidhr/sanity-plugin-dashboard-widget-muna-docs"
  ],
  "parts": [
    {
      "name": "part:@sanity/base/schema",
      "path": "./schemas/schema"
    },
    {
      "implements": "part:@sanity/dashboard/config",
      "path": "./dashboardConfig.js"
    },
  ]
}
```


## License

MIT © Tarje Lavik
See LICENSE