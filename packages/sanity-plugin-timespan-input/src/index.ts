import { definePlugin } from 'sanity'

import { timespan } from './schemas/Timespan'

export const timespanInput = definePlugin({
  name: '@seidhr/sanity-plugin-timespan-input',
  schema: {
    types: [timespan],
  },
})

export { timespan }
