import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';

import { MockAllProjects } from '../../../.storybook/mocks/api';
import { generateEnvironments, seed } from '../../../.storybook/mocks/mocks';
import AddTask from './index';

const meta: Meta<typeof AddTask> = {
  component: AddTask,
  title: 'Components/AddTask',
};

type Story = StoryObj<typeof AddTask>;

seed();
const pageEnvironment = {
  ...generateEnvironments(123),
  advancedTasks: [
    {
      command: faker.string.sample(),
      description: faker.string.sample(),
      id: faker.string.uuid(),
      advancedTaskDefinitionArguments: [],
      confirmationText: 'Confirm text',
    },
  ],
};

export const Default: Story = {
  args: {
    pageEnvironment,
  },
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({ projectByName: { ...pageEnvironment, environments: MockAllProjects(123)[0].environments } })
          );
        }),
      ],
    },
  },
};

export const NoCLIService: Story = {
  args: {
    pageEnvironment: {
      ...pageEnvironment,
      services: [],
    },
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query('getProject', (_, res, ctx) => {
          return res(ctx.delay(), ctx.data({ projectByName: {} }));
        }),
      ],
    },
  },
};

export default meta;
