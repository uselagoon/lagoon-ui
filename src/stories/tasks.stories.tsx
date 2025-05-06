import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { HttpResponse, delay, graphql } from 'msw';

import { createTasks, generateEnvironments, seed } from '../../.storybook/mocks/mocks';
import PageTasks from '../pages/tasks';

seed();
faker.seed(123);

const fakeQueryParams = {
  openshiftProjectName: faker.helpers.arrayElement(['main', 'branch']),
  deploymentName: faker.lorem.slug(),
};

const meta: Meta<typeof PageTasks> = {
  title: 'Pages/Tasks',
  component: PageTasks,
  args: {
    //@ts-ignore
    router: {
      asPath: '/projects/lagoon-deploy-123',
      query: fakeQueryParams,
    },
  },
};
type Story = StoryObj<typeof PageTasks>;

const tasks = createTasks().tasks;
type TaskType = typeof tasks;

const environment = generateEnvironments();

type ResponseType = {
  environment: (typeof environment & { tasks: TaskType }) | null;
};

export const Default: Story = {
  args: {
    renderAddTasks: true,
  },
  parameters: {
    msw: {
      handlers: [
        graphql.operation(() => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({ data: { environment: { ...environment, tasks: tasks } } });
        }),
      ],
    },
  },
};

export const Empty: Story = {
  args: {
    renderAddTasks: true,
  },
  parameters: {
    msw: {
      handlers: [
        graphql.operation(() => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({ data: { environment: { ...environment, tasks: [] } } });
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
