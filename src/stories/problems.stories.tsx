import React, { useEffect } from 'react';

import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';

import { ProblemIdentifier, generateEnvironments } from '../../.storybook/mocks/mocks';
import PageProblems from '../pages/problems';

const meta: Meta<typeof PageProblems> = {
  title: 'Pages/ProblemsPage',
  component: PageProblems,
};
type Story = StoryObj<typeof PageProblems>;

faker.seed(123);

const fakeQueryParams = {
  openshiftProjectName: faker.helpers.arrayElement(['main', 'branch']),
  deploymentName: faker.lorem.slug(),
};

const problemData = Array.from({
  length: faker.number.int({
    min: 1,
    max: 10,
  }),
}).map((_, idx) => {
  return ProblemIdentifier(idx);
})[0].problems;

export const Default: Story = {
  args: {
    router: {
      query: fakeQueryParams,
    },
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query('getEnvironment', (_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              environment: {
                ...generateEnvironments(),
                problems: problemData,
              },
            })
          );
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(ctx.delay('infinite'));
        }),
      ],
    },
  },
};
export default meta;
