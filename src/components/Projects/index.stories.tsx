import React, { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { MockAllProjects } from '../../../.storybook/mocks/api';
import ProjectsSkeleton from './ProjectsSkeleton';
import Projects from './index';

const meta: Meta<typeof Projects> = {
  title: 'Components/Projects',
  component: Projects,
  tags: ['autodocs'],
};
type Story = StoryObj<typeof Projects>;

export const Default: Story = {
  render: (data, args) => {
    return <Projects initialSearch={''} projects={data.projects} {...args} />;
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
  render: function Render() {
    const [, setSearchInput] = useState('');
    return <ProjectsSkeleton setSearch={setSearchInput} />;
  },
};

export default meta;
