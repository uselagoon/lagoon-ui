import React from 'react';



import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';



import { generateEnvironments } from '../../../.storybook/mocks/mocks';
import AddTask from './index';


const meta: Meta<typeof AddTask> = {
  component: AddTask,
  title: 'Components/AddTask',
};

type Story = StoryObj<typeof AddTask>;

const pageEnvironment = {
  ...generateEnvironments(),
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
};

export const NoCLIService: Story = {
  args: {
    pageEnvironment: {
      ...pageEnvironment,
      services: [],
    },
  },
};

export default meta;