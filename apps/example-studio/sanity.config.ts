import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { dashboardTool } from "@sanity/dashboard";
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { kulturnavInput } from '@seidhr/sanity-plugin-muna-la-external-references'
import { munaDocsWidget } from '@seidhr/sanity-plugin-dashboard-widget-muna-docs'
import { timespanInput } from '@seidhr/sanity-plugin-timespan-input'
import { schemaTypes } from './schemas'
import { asyncList } from '@sanity/sanity-plugin-async-list';

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
    kulturnavInput({
      apiBaseUrl: 'https://kulturnav.org',
      apiVersion: 'v1.5',
      defaultLanguage: 'no',
      storageMode: 'reference',
    }),
    timespanInput(),
    colorInput(),
    asyncList({
      schemaType: 'disneyCharacter', // Name of type to be used in schema definitions
      // Loader function to fetch data however you prefer
      loader: async () => {
        const response = await fetch('https://api.disneyapi.dev/character')
        const result: { data: { name: string }[] } = await response.json()

        return result.data.map((item) => {
          return { value: item.name, ...item }
        })
      },
    }),
  ],

  schema: {
    types: [
      ...schemaTypes
    ],
  },
})
