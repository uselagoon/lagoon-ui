import React from 'react';

import { StoryObj } from '@storybook/react';

import { generateEnvironments } from '../../../.storybook/mocks/mocks';
import DeploymentsLink from './Deployments';

export default {
  component: DeploymentsLink,
  title: 'Components/link/DeploymentsLink',
};

const environment = generateEnvironments();

type Story = StoryObj<typeof DeploymentsLink>;

export const Default: Story = {
  args: {
    environmentSlug: environment.openshiftProjectName,
    projectSlug: environment.project.name,
  },
  render: args => {
    return (
      <>
        <DeploymentsLink {...args}>Deployments link</DeploymentsLink>
      </>
    );
  },
};
