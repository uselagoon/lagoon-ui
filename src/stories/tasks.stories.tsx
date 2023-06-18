import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { graphql } from 'msw';

import { createTasks, generateEnvironments,seed } from '../../.storybook/mocks/mocks';
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

export const Default: Story = {
  args: {
    renderAddTasks: true,
  },
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              environment: { ...generateEnvironments(), tasks: tasks },
            })
          );
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
        graphql.operation((_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              environment: { ...generateEnvironments(), tasks: [] },
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
