import schemaTypes from 'all:part:@sanity/base/schema-type'
import createSchema from 'part:@sanity/base/schema-creator'

export default createSchema({
  name: 'default',
  types: schemaTypes
})