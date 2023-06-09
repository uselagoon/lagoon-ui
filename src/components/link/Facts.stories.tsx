import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { generateEnvironments } from '../../../.storybook/mocks/mocks';
import FactsLink from './Facts';

const meta: Meta<typeof FactsLink> = {
  component: FactsLink,
  title: 'Components/link/FactsLink',
};

const environment = generateEnvironments();

type Story = StoryObj<typeof FactsLink>;

export const Default: Story = {
  args: {
    environmentSlug: environment.openshiftProjectName,
    projectSlug: environment.project.name,
  },
  render: args => {
    return (
      <>
        <FactsLink {...args}>Facts link</FactsLink>
      </>
    );
  },
};
export default meta;
