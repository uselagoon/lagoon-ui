import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { HttpResponse, delay, graphql } from 'msw';

import { generateEnvironments, getDeployment, seed } from '../../.storybook/mocks/mocks';
import PageDeployments from '../pages/deployments';

const meta: Meta<typeof PageDeployments> = {
  title: 'Pages/Deployments',
  component: PageDeployments,
};
type Story = StoryObj<typeof PageDeployments>;

faker.seed(123);
const fakeQueryParams = {
  openshiftProjectName: faker.helpers.arrayElement(['main', 'branch']),
  deploymentName: faker.lorem.slug(),
};

seed();

const environmentResponse = {
  ...generateEnvironments(123),
  deployments: [getDeployment(1), getDeployment(115), getDeployment(30), getDeployment(123)],
};
type ResponseType = {
  environment: typeof environmentResponse;
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
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
