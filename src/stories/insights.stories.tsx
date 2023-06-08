import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { graphql } from 'msw';

import { generateEnvironments, generateInsight } from '../../.storybook/mocks/mocks';
import PageInsights from '../pages/insights';

const meta: Meta<typeof PageInsights> = {
  title: 'Pages/Insights',
  component: PageInsights,
};
type Story = StoryObj<typeof PageInsights>;

faker.seed();
const environment = generateEnvironments(123);
environment.insights = [generateInsight(), generateInsight(), generateInsight(), generateInsight()] as any;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              environment,
            })
          );
        }),
      ],
    },
  },
};

export const NoInsights: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              environment: { ...environment, insights: [] },
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

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(ctx.status(403));
        }),
      ],
    },
  },
  render: () => {
    return <QueryError error="Error" />;
  },
};
export default meta;
