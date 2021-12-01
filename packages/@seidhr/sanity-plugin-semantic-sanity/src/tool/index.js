import React from 'react';
import schemas from 'part:@sanity/base/schema';
import Home from './Home';

// eslint-disable-next-line no-underscore-dangle
const { types } = schemas._source;

const boundHome = <Home sourceSchemas={types} />;

export default {
  title: 'Semantic Sanity',
  name: 'semantic-sanity',
  component: () => boundHome,
};
