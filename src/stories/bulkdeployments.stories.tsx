import React from 'react';

import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { HttpResponse, delay, graphql } from 'msw';

import { MockBulkDeployments } from '../../.storybook/mocks/api';
import BulkDeploymentsPage from '../pages/bulkdeployments';

const meta: Meta<typeof BulkDeploymentsPage> = {
  title: 'Pages/Bulk deployments',
  component: BulkDeploymentsPage,
};
type Story = StoryObj<typeof BulkDeploymentsPage>;

faker.seed(123);
const fakeQueryParams = {
  id: faker.string.uuid(),
  bulkName: faker.lorem.slug(),
};

const deploymentsByBulkId = MockBulkDeployments(123);

type ResponseType = {
  deploymentsByBulkId: typeof deploymentsByBulkId | null;
};

type MutationResponseType = {
  cancelDeployment: string;
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
        graphql.mutation('cancelDeployment', () => {
          delay(1000);
          return HttpResponse.json<{ data: MutationResponseType }>({ data: { cancelDeployment: 'success' } });
        }),
        graphql.operation(() => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({ data: { deploymentsByBulkId: deploymentsByBulkId } });
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
        graphql.query('deploymentsByBulkId', () => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({ data: { deploymentsByBulkId: [] } });
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation(() => {
          return delay('infinite');
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation(() => {
          return new HttpResponse('', { status: 403 });
        }),
      ],
    },
  },
  render: () => {
    return <QueryError error="Error" />;
  },
};

export default meta;
