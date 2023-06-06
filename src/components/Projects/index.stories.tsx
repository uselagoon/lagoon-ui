import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { MockAllProjects } from '../../../.storybook/mocks/api';
import ProjectsSkeleton from './ProjectsSkeleton';
import Projects from './index';

const meta: Meta<typeof Projects> = {
  title: 'Components/Projects',
  component: Projects,
};
type Story = StoryObj<typeof Projects>;

export const Default: Story = {
  render: (data, args) => {
    return <Projects projects={data.projects} {...args} />;
  },
  args: {
    projects: MockAllProjects(123),
  },
};

export const Empty: Story = {
  args: {
    projects: [],
  },
};

export const Loading: Story = {
  render: () => <ProjectsSkeleton />,
};

export default meta;
