import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { HttpResponse, delay, graphql } from 'msw';

import { generateEnvironments, generateInsight, seed } from '../../.storybook/mocks/mocks';
import PageInsights from '../pages/insights';

const meta: Meta<typeof PageInsights> = {
  title: 'Pages/Insights',
  component: PageInsights,
};
type Story = StoryObj<typeof PageInsights>;

faker.seed(123);

const fakeQueryParams = {
  openshiftProjectName: faker.helpers.arrayElement(['main', 'branch']),
  deploymentName: faker.lorem.slug(),
};

seed();
const environment = generateEnvironments(123);
environment.insights = [generateInsight(1), generateInsight(2), generateInsight(3), generateInsight(123)] as any;

type ResponseType = {
  environment: typeof environment;
};

export const Default: Story = {
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
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              environment,
            },
          });
        }),
      ],
    },
  },
};

export const NoInsights: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation(() => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              environment: {
                ...environment,
                insights: [],
              },
            },
          });
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
