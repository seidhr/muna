import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { dashboardTool } from "@sanity/dashboard";
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { myPlugin } from '@seidhr/sanity-plugin-muna-kulturnav-api'

export default defineConfig({
  name: 'default',
  title: 'example-studio',

  projectId: 'fvh5qgi6',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
    dashboardTool({ widgets: [] })
  ],

  schema: {
    types: schemaTypes,
  },
})
