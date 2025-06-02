import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, delay, graphql } from 'msw';

import { generateEnvironments, generateProjectInfo, seed } from '../../.storybook/mocks/mocks';
import PageEnvironment from '../pages/environment';

faker.seed(123);
const fakeQueryParams = {
  openshiftProjectName: faker.helpers.arrayElement(['main', 'branch']),
  deploymentName: faker.lorem.slug(),
};

const meta: Meta<typeof PageEnvironment> = {
  title: 'Pages/Environment',
  component: PageEnvironment,
  args: {
    router: {
      asPath: '/projects/lagoon-deploy-123',
      query: fakeQueryParams,
    },
  },
};
type Story = StoryObj<typeof PageEnvironment>;

seed();
const environment = generateEnvironments(123);

type ResponseType = {
  environment: typeof environment | null;
};

// @ts-ignore
environment.project = generateProjectInfo();

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation(() => {
          return HttpResponse.json<{ data: ResponseType }>({ data: { environment } });
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

export const EnvironmentNotFound: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation(() => {
          delay();

          return HttpResponse.json<{ data: ResponseType }>({ data: { environment: null } });
        }),
      ],
    },
  },
};

export default meta;
