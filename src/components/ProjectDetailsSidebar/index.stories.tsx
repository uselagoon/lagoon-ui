import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { generateProjectInfo } from '../../../.storybook/mocks/mocks';
import ProjectSkeleton from './SidebarSkeleton';
import ProjectDetailsSidebar from './index';

/**
 * Sidebar component used in project drilldown pages
 */
const meta: Meta<typeof ProjectDetailsSidebar> = {
  component: ProjectDetailsSidebar,
  title: 'Components/ProjectDetailsSidebar',
  tags:["autodocs"],
};

type Story = StoryObj<typeof ProjectDetailsSidebar>;

const project = generateProjectInfo();

export const Default = () => <ProjectDetailsSidebar project={project} />;

export const Loading: Story = {
  render: () => <ProjectSkeleton hideWrapper={true} />,
};

export default meta;
