/**
 * Map props to '@id', '@container' and '@type'
 * @param {array} fields
 * @returns {object}
 */

export const getFields = (fields, base) => {
  if (!fields) return

  const result = fields.filter(i => i.options?.semanticSanity?.exclude != true).map((field) => {
    return {
      [field.name]: {
        '@id': field.options?.semanticSanity?.['@id'] ? field.options.semanticSanity['@id'] : `${base}${field.name}`,
        '@container': field.options?.semanticSanity?.['@container'] ? field.options.semanticSanity['@container'] : undefined,
        '@type': field.options?.semanticSanity?.['@type'] ? field.options.semanticSanity['@type'] : field.type === 'reference' ? `${base}${field.name}` : undefined,
      },
    };
  });
  if (!result.length) return

  return Object.assign(...result);
};
