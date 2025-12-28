import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { dashboardTool } from "@sanity/dashboard";
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { APISearchInput } from '@seidhr/sanity-plugin-muna-kulturnav-api'
import { munaDocsWidget } from '@seidhr/sanity-plugin-dashboard-widget-muna-docs'
import { timespanInput } from '@seidhr/sanity-plugin-timespan-input'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'example-studio',

  projectId: 'fvh5qgi6',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    dashboardTool({
      widgets: [
        munaDocsWidget({ layout: { width: 'auto' } }),
      ]
    }),
    APISearchInput({}),
    timespanInput(),
    colorInput(),
  ],

  schema: {
    types: [
      ...schemaTypes
    ],
  },
})
