import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { dashboardTool } from "@sanity/dashboard";
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { myPlugin } from '@seidhr/sanity-plugin-muna-kulturnav-api'
import { munaDocsWidget } from '@seidhr/sanity-plugin-dashboard-widget-muna-docs'

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
    myPlugin({})
  ],

  schema: {
    types: schemaTypes,
  },
})
