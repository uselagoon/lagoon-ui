import React from 'react';

import { faker } from '@faker-js/faker';

import { ProblemIdentifier } from '../../../.storybook/mocks/mocks';
import Problems from './index';

export default {
  component: Problems,
  title: 'Components/Problems',
  tags: ['autodocs'],
};

faker.seed(123);
const problemData = Array.from({
  length: faker.number.int({
    min: 1,
    max: 10,
  }),
}).map((_, idx) => {
  return ProblemIdentifier(idx);
})[0].problems;

export const Default = () => <Problems problems={problemData} />;

export const NoProblems = () => <Problems problems={[]} />;
