import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { dashboardTool } from "@sanity/dashboard";
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { myPlugin } from '@seidhr/sanity-plugin-muna-kulturnav-api'
import { munaDocsWidget } from '@seidhr/sanity-plugin-dashboard-widget-muna-docs'
import { timespanInput } from '@seidhr/sanity-plugin-timespan-input'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'example-studio',

  projectId: 'fvh5qgi6',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
    dashboardTool({
      widgets: [
        munaDocsWidget({ layout: { width: 'small' } }),
      ]
    }),
    myPlugin({}),
    timespanInput(),
    colorInput(),
  ],

  schema: {
    types: [
      ...schemaTypes
    ],
  },
})
