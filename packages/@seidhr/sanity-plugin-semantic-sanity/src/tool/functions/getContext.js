import config from 'config:@seidhr/sanity-plugin-semantic-sanity';
import { getConfig } from './getConfig';

/**
 * Create default context
 * @returns {object}
 */
export const getContext = () => {
  const { vocab, vocabUri, base, prefixes } = getConfig();

  // Default context
  const context = {
    '@context': {
      '@version': 1.1,
      '@base': config.base ? config.base : undefined,
      [vocab]: vocabUri,
      ...prefixes,
      _id: '@id',
      _ref: '@id',
      id: '@id',
      _type: '@type',
      type: '@type',
      '_rev': `${vocabUri}revisionId`
    },
  };

  return { context, base };
};
