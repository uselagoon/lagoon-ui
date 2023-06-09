import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { generateEnvironments } from '../../../.storybook/mocks/mocks';
import ProjectLink from './Project';

const meta: Meta<typeof ProjectLink> = {
  component: ProjectLink,
  title: 'Components/link/ProjectLink',
};

const environment = generateEnvironments();

type Story = StoryObj<typeof ProjectLink>;

export const Default: Story = {
  args: {
    projectSlug: environment.project.name,
  },
  render: args => {
    return (
      <>
        <ProjectLink {...args}>Task link</ProjectLink>
      </>
    );
  },
};
export default meta;
