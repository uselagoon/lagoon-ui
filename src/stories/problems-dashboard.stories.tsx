import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';

import { ProblemIdentifier } from '../../.storybook/mocks/mocks';
import ProblemsDashboardPage from '../pages/problems-dashboard';

const meta: Meta<typeof ProblemsDashboardPage> = {
  title: 'Pages/Problems Dashboard',
  component: ProblemsDashboardPage,
};
type Story = StoryObj<typeof ProblemsDashboardPage>;

faker.seed(123);
const problemData = Array.from({
  length: faker.number.int({
    min: 1,
    max: 10,
  }),
}).map((_, idx) => {
  return ProblemIdentifier(idx);
})[0].problems;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getAllProblemsQuery', (_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              problems: problemData,
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
