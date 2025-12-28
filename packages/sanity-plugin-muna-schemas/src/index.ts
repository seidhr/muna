import { definePlugin } from 'sanity'

export const munaSchema = definePlugin({
	name: '@seidhr/sanity-plugin-muna-schema',
	schema: {
		types: [],
	},
})

export { default as HumanMadeObject } from './schemas/classes/persistent/physical/HumanMadeObject'
