import _ from 'lodash';

/**
 * Order the schemas for simpler diffs
 * @returns {array}
 */
export const orderSchemas = (schemas) => {
  const result = _.orderBy(schemas, ['name'], ['asc']);
  return result.filter(c => c.options?.semanticSanity?.exclude != true);
};
