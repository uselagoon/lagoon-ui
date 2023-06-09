import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { generateEnvironments } from '../../../.storybook/mocks/mocks';
import ProblemsLink from './Problems';

const meta: Meta<typeof ProblemsLink> = {
  component: ProblemsLink,
  title: 'Components/link/ProblemsLink',
};

const environment = generateEnvironments();

type Story = StoryObj<typeof ProblemsLink>;

export const Default: Story = {
  args: {
    projectSlug: environment.project.name,
  },
  render: args => {
    return (
      <>
        <ProblemsLink {...args}>Problems link</ProblemsLink>
      </>
    );
  },
};
export default meta;
