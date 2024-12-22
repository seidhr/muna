/* eslint-disable array-callback-return */
import config from 'config:@sanity/document-internationalization';

export const coalesceLabel = (label, lang) => {
  let langs = [lang || ''];

  config.languages.map((x) => {
    langs.push(x.id);
  });

  langs = [...new Set(langs)];

  if (!label) {
    return '';
  }

  if (label && typeof label === 'string') {
    return label;
  }

  if (lang && label[lang]) {
    return label[lang];
  }

  const result = getLabelByLangs(label, langs);
  return result[0];
};

function getLabelByLangs(label, arr) {
  if (!label || !arr) {
    return;
  }

  const labels = [];

  arr.map((element) => {
    Object.entries(label).map(([key, val]) => {
      if (key === element) {
        labels.push(val);
      }
    });
  });

  // eslint-disable-next-line consistent-return
  return labels || 'Untitled';
}
