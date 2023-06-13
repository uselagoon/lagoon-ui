import { Meta, StoryObj } from '@storybook/react';

import { generateEnvironments } from '../../../.storybook/mocks/mocks';
import NavTabs from './index';

/**
 * Left navigation tabs in project drilldown pages
 */
const meta: Meta<typeof NavTabs> = {
  component: NavTabs,
  title: 'Components/NavTabs',
  tags:["autodocs"],
  args: {
    environment: generateEnvironments(),
  },
  argTypes:{
    environment: {
      description: 'Project environment object',
    },
  }

};

type Story = StoryObj<typeof NavTabs>;

export const Default: Story = {};

export const OverviewTabActive: Story = {
  args: {
    activeTab: 'overview',
  },
};

export const DeploymentsTabActive: Story = {
  args: {
    activeTab: 'deployments',
  },
};

export const BackupsTabActive: Story = {
  args: {
    activeTab: 'backups',
  },
};

export const TasksTabActive: Story = {
  args: {
    activeTab: 'tasks',
  },
};

export const ProblemsTabActive: Story = {
  args: {
    activeTab: 'problems',
  },
};

export const FactsTabActive: Story = {
  args: {
    activeTab: 'facts',
  },
};
export const InsightsTabActive: Story = {
  args: {
    activeTab: 'insights',
  },
};

export default meta;
