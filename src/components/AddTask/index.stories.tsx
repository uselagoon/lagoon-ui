import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, delay, graphql } from 'msw';

import { MockAllProjects } from '../../../.storybook/mocks/api';
import { generateEnvironments, seed } from '../../../.storybook/mocks/mocks';
import AddTask from './index';

const meta: Meta<typeof AddTask> = {
  //@ts-ignore
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
const projectByNameResponse = { ...pageEnvironment, environments: MockAllProjects(123)[0].environments };

type ResponseType = {
  projectByName: typeof projectByNameResponse | {};
};

export const Default: Story = {
  args: {
    //@ts-ignore
    pageEnvironment,
  },
  parameters: {
    msw: {
      handlers: [
        graphql.operation(() => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({ data: { projectByName: projectByNameResponse } });
        }),
      ],
    },
  },
};

export const NoCLIService: Story = {
  args: {
    //@ts-ignore
    pageEnvironment: { ...pageEnvironment, services: [] },
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query('getProject', () => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              projectByName: {},
            },
          });
        }),
      ],
    },
  },
};

export default meta;
