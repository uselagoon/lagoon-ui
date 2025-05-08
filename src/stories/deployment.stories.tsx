import React from 'react';

import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { HttpResponse, delay, graphql } from 'msw';

import { generateEnvironments, getDeployment, seed } from '../../.storybook/mocks/mocks';
import PageDeployment from '../pages/deployment';

const meta: Meta<typeof PageDeployment> = {
  title: 'Pages/Deployment',
  component: PageDeployment,
};
type Story = StoryObj<typeof PageDeployment>;

faker.seed(123);

const environmentResponse = { ...generateEnvironments(123), deployments: [getDeployment(30)] };

type ResponseType = {
  environment: typeof environmentResponse;
};

type MutationResponseType = {
  cancelDeployment: string;
};

const fakeQueryParams = {
  openshiftProjectName: faker.helpers.arrayElement(['main', 'branch']),
  deploymentName: faker.lorem.slug(),
};

seed();
export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.mutation('cancelDeployment', () => {
          delay(1000);
          return HttpResponse.json<{ data: MutationResponseType }>({
            data: {
              cancelDeployment: 'success',
            },
          });
        }),

        graphql.operation(() => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              environment: environmentResponse,
            },
          });
        }),
      ],
    },
  },
};

export const Loading: Story = {
  args: {
    router: {
      asPath: '/projects/lagoon-deploy-123',
      query: fakeQueryParams,
    },
  },
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
