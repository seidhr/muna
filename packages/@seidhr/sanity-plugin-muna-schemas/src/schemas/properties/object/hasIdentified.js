/**
 * P35_has_identified
 */

export const hasIdentified = {
  name: 'hasIdentified',
  title: 'Identifiserte tilstander',
  titleEN: 'Has identified condition states',
  type: 'array',
  of: [{ type: 'ConditionState' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
};
