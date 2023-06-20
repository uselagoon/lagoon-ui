import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { generateEnvironments, seed } from '../../../.storybook/mocks/mocks';
import TasksLink from './Tasks';

const meta: Meta<typeof TasksLink> = {
  component: TasksLink,
  title: 'Components/link/TasksLink',
};

seed();
const environment = generateEnvironments();

type Story = StoryObj<typeof TasksLink>;

export const Default: Story = {
  args: {
    environmentSlug: environment.openshiftProjectName,
    projectSlug: environment.project.name,
  },
  render: args => {
    return (
      <>
        <TasksLink {...args}>Deployments link</TasksLink>
      </>
    );
  },
};

export default meta;
