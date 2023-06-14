import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { graphql } from 'msw';

import { MockAllDeployments } from '../../.storybook/mocks/api';
import AllDeployments from '../pages/alldeployments';

const meta: Meta<typeof AllDeployments> = {
  title: 'Pages/All Deployments',
  component: AllDeployments,
};
type Story = StoryObj<typeof AllDeployments>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('deploymentsByFilter', (_, res, ctx) => {
          return res(ctx.delay(), ctx.data({ deploymentsByFilter: MockAllDeployments(123) }));
        }),
        graphql.mutation('cancelDeployment', (_, res, ctx) => {
          return res(
            ctx.delay(1000),
            ctx.data({
              cancelDeployment: 'success',
            })
          );
        }),
      ],
    },
  },
};

export const NoDeployments: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('deploymentsByFilter', (_, res, ctx) => {
          return res(ctx.delay(), ctx.data({ deploymentsByFilter: [] }));
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('deploymentsByFilter', (_, res, ctx) => {
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
