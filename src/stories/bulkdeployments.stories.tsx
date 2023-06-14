import React, { useEffect } from 'react';

import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { graphql } from 'msw';

import { MockBulkDeployments } from '../../.storybook/mocks/api';
import BulkDeploymentsPage from '../pages/bulkdeployments';

const meta: Meta<typeof BulkDeploymentsPage> = {
  title: 'Pages/Bulk deployments',
  component: BulkDeploymentsPage,
};
type Story = StoryObj<typeof BulkDeploymentsPage>;

const fakeQueryParams = {
  id: faker.string.uuid(),
  bulkName: faker.lorem.slug(),
};

export const Default: Story = {
  args: {
    router: {
      query: fakeQueryParams,
    },
  },
  parameters: {
    msw: {
      handlers: [
        graphql.mutation('cancelDeployment', (_, res, ctx) => {
          return res(
            ctx.delay(1000),
            ctx.data({
              cancelDeployment: 'success',
            })
          );
        }),
        graphql.operation((_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              deploymentsByBulkId: MockBulkDeployments(123),
            })
          );
        }),
      ],
    },
  },
};

export const NoDeployments: Story = {
  args: {
    router: {
      query: fakeQueryParams,
    },
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query('deploymentsByBulkId', (_, res, ctx) => {
          return res(
            ctx.data({
              deploymentsByBulkId: [],
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
