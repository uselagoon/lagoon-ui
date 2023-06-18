import React from 'react';

import { faker } from '@faker-js/faker';

import { ProblemIdentifier } from '../../../.storybook/mocks/mocks';
import ProblemsByIdentifier from './index';

export default {
  component: ProblemsByIdentifier,
  title: 'Components/ProblemsByIdentifier',
  tags: ['autodocs'],
};

export const Default = () => (
  <ProblemsByIdentifier
    problems={Array.from({
      length: faker.number.int({
        min: 1,
        max: 10,
      }),
    }).map((_,idx) => {
      return ProblemIdentifier(idx);
    })}
  />
);

export const NoProblems = () => <ProblemsByIdentifier problems={[]} />;
