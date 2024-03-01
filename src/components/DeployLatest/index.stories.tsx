import { Meta, StoryObj } from '@storybook/react';

import withButtonOverrides from '../../../.storybook/decorators/withButtonOverrides';
import { generateEnvironments, seed } from '../../../.storybook/mocks/mocks';
import DeployLatest from './index';

const meta: Meta<typeof DeployLatest> = {
  component: DeployLatest,
  title: 'Components/Deploy Latest',
  tags: ['autodocs'],
  decorators: [withButtonOverrides('button', 'click', 'Deploylatest button click')],
};

type Story = StoryObj<typeof DeployLatest>;

seed();

const environment = generateEnvironments({ name: 'master' });

/**
 * Default
 */
export const Default: Story = {
  args: {
    pageEnvironment: environment,
  },
};

/**
 *  Deploy a branch.
 */
export const Branch: Story = {
  args: {
    pageEnvironment: environment,
  },
};

/**
 * Deploy an environment.
 */
export const PromoteEnvironment: Story = {
  args: {
    pageEnvironment: { ...environment, deployType: 'promote' },
  },
};

const prEnvironment = generateEnvironments({ name: 'pr-100' });
/**
 * Pull request deployment
 */
export const PullRequest: Story = {
  args: {
    pageEnvironment: prEnvironment,
  },
};

/**
 * Deployments are not available.
 */
export const Unavailable: Story = {
  args: {
    pageEnvironment: {
      ...environment,
      deployBaseRef: '',
    },
  },
};

export const Loading = () => '@TODO';
Loading.story = {
  parameters: {
    docs: {
      storyDescription: '@TODO Not yet implemented.',
    },
  },
};

export const DeploySuccessful = () => '@TODO';
DeploySuccessful.story = {
  parameters: {
    docs: {
      storyDescription: '@TODO Not yet implemented.',
    },
  },
};

export const Error = () => '@TODO';
Error.story = {
  parameters: {
    docs: {
      storyDescription: '@TODO Not yet implemented.',
    },
  },
};

export default meta;
