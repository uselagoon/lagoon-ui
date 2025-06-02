import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { HttpResponse, delay, graphql } from 'msw';

import { MockAllDeployments } from '../../.storybook/mocks/api';
import AllDeployments from '../pages/alldeployments';

const meta: Meta<typeof AllDeployments> = {
  title: 'Pages/All Deployments',
  component: AllDeployments,
};
type Story = StoryObj<typeof AllDeployments>;

const deployments = MockAllDeployments(123);

type ResponseType = {
  deploymentsByFilter: typeof deployments | null;
};

type MutationResponseType = {
  cancelDeployment: string;
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('deploymentsByFilter', () => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({ data: { deploymentsByFilter: deployments } });
        }),
        graphql.mutation('cancelDeployment', () => {
          delay(1000);
          return HttpResponse.json<{ data: MutationResponseType }>({ data: { cancelDeployment: 'success' } });
        }),
      ],
    },
  },
};

export const NoDeployments: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('deploymentsByFilter', () => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({ data: { deploymentsByFilter: [] } });
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('deploymentsByFilter', () => {
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
