import React from 'react';
import schema from 'part:@sanity/base/schema';
import Home from './Home';

// eslint-disable-next-line no-underscore-dangle
const { types } = schema._source;

const boundHome = <Home types={types} />;

export default {
  title: 'Semantic Sanity',
  name: 'semantic-sanity',
  component: () => boundHome,
};
