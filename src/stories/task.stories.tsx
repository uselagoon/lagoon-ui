import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import Task from 'components/Task';
import QueryError from 'components/errors/QueryError';
import { graphql } from 'msw';

import { createTask, generateEnvironments, seed } from '../../.storybook/mocks/mocks';
import PageTask from '../pages/task';

seed();
faker.seed(123);

const fakeQueryParams = {
  openshiftProjectName: faker.helpers.arrayElement(['main', 'branch']),
  taskSlug: faker.lorem.slug(),
  taskName: faker.lorem.text(),
};

const meta: Meta<typeof PageTask> = {
  title: 'Pages/Task',
  component: PageTask,
  args: {
    router: {
      asPath: '/projects/lagoon-deploy-123',
      query: fakeQueryParams,
    },
  },
};
type Story = StoryObj<typeof PageTask>;

const success = [{ ...createTask().task, status: 'succeeded', name: 'succeeded-task' }];
const failed = [{ ...createTask().task, status: 'failed', name: 'failed-task' }];

export const Success: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getEnvironment', (_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              environment: { ...generateEnvironments(), tasks: success },
            })
          );
        }),
      ],
    },
  },
};

export const Failed: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getEnvironment', (_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              environment: { ...generateEnvironments(), tasks: failed },
            })
          );
        }),
      ],
    },
  },
};

export const Empty: Story = {
  render: () => {
    return (
      //@ts-ignore
      <Task task={undefined} />
    );
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
