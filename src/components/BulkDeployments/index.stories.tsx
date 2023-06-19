import React from 'react';

import { StoryObj } from '@storybook/react';

import withButtonOverrides from '../../../.storybook/decorators/withButtonOverrides';
import { getDeployment } from '../../../.storybook/mocks/mocks';
import BulkDeploymentsSkeleton from './BulkDeploymentsSkeleton';
import BulkDeployments from './index';

export default {
  component: BulkDeployments,
  title: 'Components/BulkDeployments',
  tags: ['autodocs'],
  decorators: [withButtonOverrides('button', 'click', 'Deployment button click')],
  argTypes:{
    deployments: {
      description: 'Deployments array',
    },
  }

};



const data = [
  {
    ...getDeployment(123),
    priority: 'urgent',
    status: 'complete',
  },
  {
    ...getDeployment(1234),
    priority: 'urgent',
    status: 'complete',
  },
  {
    ...getDeployment(12345),
    priority: 'urgent',
    status: 'complete',
  },
  {
    ...getDeployment(123456),
    priority: 'urgent',
    status: 'complete',
  },
];

console.warn(data);

type Story = StoryObj<typeof BulkDeployments>;

export const Complete: Story = {
  args: {
    deployments: data,
  },
};

export const NoDeployments: Story = {
  args: {
    deployments: [],
  },
};

export const New: Story = {
  args: {
    deployments: [
      {
        ...data[0],
        status: 'new',
      },
    ],
  },
};

export const Pending: Story = {
  args: {
    deployments: [
      {
        ...data[0],
        status: 'pending',
      },
    ],
  },
};

export const Running: Story = {
  args: {
    deployments: [
      {
        ...data[2],
        status: 'running',
      },
    ],
  },
};

export const Cancelled: Story = {
  args: {
    deployments: [
      {
        ...data[1],
        status: 'cancelled',
      },
    ],
  },
};

export const Error: Story = {
  args: {
    deployments: [
      {
        ...data[1],
        status: 'error',
      },
    ],
  },
};

export const Failed: Story = {
  args: {
    deployments: [
      {
        ...data[1],
        status: 'failed',
      },
    ],
  },
};

export const Loading: Story = {
  render: () => <BulkDeploymentsSkeleton />,
};
