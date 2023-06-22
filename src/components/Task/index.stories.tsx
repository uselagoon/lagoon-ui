import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import TaskSkeleton from 'components/Task/TaskSkeleton';

import { createTask,seed } from '../../../.storybook/mocks/mocks';
import Task from './index';

const meta: Meta<typeof Task> = {
  title: 'Components/Task',
  component: Task,
  tags: ['autodocs'],
};

seed();
const { task } = createTask();

type Story = StoryObj<typeof Task>;

export const Default: Story = {
  args: {
    task,
  },
  argTypes: {
    task: {
      description: 'A task object',
    },
  },
};

export const NoTask: Story = {
  args: {
    task: undefined,
  },
};

export const Loading: Story = {
  render: () => <TaskSkeleton />,
};

export default meta;
