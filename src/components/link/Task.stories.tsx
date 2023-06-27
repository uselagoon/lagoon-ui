import React from 'react';

import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';

import { generateEnvironments, seed } from '../../../.storybook/mocks/mocks';
import TaskLink from './Task';

const meta: Meta<typeof TaskLink> = {
  component: TaskLink,
  title: 'Components/link/TaskLink',
};

seed();

const task = {
  id: faker.lorem.slug(),
  environment: generateEnvironments(),
};

type Story = StoryObj<typeof TaskLink>;

export const Default: Story = {
  args: {
    taskSlug: task.id,
    environmentSlug: task.environment.openshiftProjectName,
    projectSlug: task.environment.project.name,
  },
  render: args => {
    return (
      <>
        <TaskLink {...args}>Task link</TaskLink>
      </>
    );
  },
};

export default meta;