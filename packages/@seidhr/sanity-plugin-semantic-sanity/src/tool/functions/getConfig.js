import config from 'config:@seidhr/sanity-plugin-semantic-sanity';

/**
 * Get config
 * @returns {object} 
 */
export const getConfig = () => {
  const ontologyName = config.name;
  const vocab = config.vocab?.prefix ? config.vocab.prefix : '@vocab';
  const vocabUri = config.vocab?.uri ? config.vocab.uri : 'http://example.org/model/0.1/';

  // If vocab is set to '@vocab' then we do not add a prefix to '@id' values, because '@base' sets prefix for all
  const base = config.vocab?.prefix && config.vocab?.prefix != '@vocab' ? `${config.vocab.prefix}:` : '';
  const prefixes = config.prefixes;

  return { ontologyName, vocab, vocabUri, base, prefixes };
};
