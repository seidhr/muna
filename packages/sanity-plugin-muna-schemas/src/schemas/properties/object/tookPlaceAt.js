import { defineField } from 'sanity'

export const tookPlaceAt = defineField({
  name: 'tookPlaceAt',
  title: 'Took place at',
  description: (
    <span>
      Where did this happen? Add{' '}
      <a target="blank" href={'/desk/steder'}>
        a new place
      </a>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'Place' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id',
    },
  },
})
