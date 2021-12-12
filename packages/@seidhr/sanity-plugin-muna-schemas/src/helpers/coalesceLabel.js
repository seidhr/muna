import { supportedLanguages } from '../vocabularies/defaultVocabularies';

export const coalesceLabel = (label, lang) => {
  let langs = [lang || ''];
  supportedLanguages.map((x) => {
    langs.push(x.id);
  });
  langs = [...new Set(langs)];

  if (!label) {
    return;
  }

  if (label && typeof label === 'string') {
    return label;
  }

  if (lang && label[lang]) {
    return label[lang];
  }

  let result = getLabelByLangs(label, langs);
  return result[0];
};

function getLabelByLangs(label, arr) {
  if (!label || !arr) {
    return;
  }
  let labels = [];

  arr.map((element) => {
    Object.entries(label).map(([key, val]) => {
      if (key === element) {
        labels.push(val);
      }
    });
  });
  return labels || 'Untitled';
}
