import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { createTasks } from '../../../.storybook/mocks/mocks';
import TasksSkeleton from './TasksSkeleton';
import Tasks from './index';

const meta: Meta<typeof Tasks> = {
  title: 'Components/Tasks',
  component: Tasks,
  tags: ['autodocs'],
};

const { tasks } = createTasks(123);

type Story = StoryObj<typeof Tasks>;

export const Default: Story = {
  args: {
    tasks,
  },
};

export const NoTasks: Story = {
  args: {
    tasks: [],
  },
};

export const Loading: Story = {
  render: () => <TasksSkeleton />,
};

export default meta;
