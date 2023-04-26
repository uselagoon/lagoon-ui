import React from 'react';

import mocks, { generator } from 'api/src/mocks';

import Problems from './index';

export default {
  component: Problems,
  title: 'Components/Problems',
};

export const Default = () => <Problems problems={generator(mocks.Problem, 1, 20)} />;

export const NoProblems = () => <Problems problems={[]} />;
