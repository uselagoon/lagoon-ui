import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { generateEnvironments } from '../../../.storybook/mocks/mocks';
import EnvironmentLink from './Environment';

const meta: Meta<typeof EnvironmentLink> = {
  component: EnvironmentLink,
  title: 'Components/link/EnvironmentLink',
};

const environment = generateEnvironments();

type Story = StoryObj<typeof EnvironmentLink>;

export const Default: Story = {
  args: {
    environmentSlug: environment.openshiftProjectName,
    projectSlug: environment.project.name,
  },
  render: args => {
    return (
      <>
        <EnvironmentLink {...args}>Environment link</EnvironmentLink>
      </>
    );
  },
};
export default meta;
