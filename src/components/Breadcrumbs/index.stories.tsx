import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import EnvironmentBreadcrumb from './Environment';
import ProjectBreadcrumb from './Project';
import Breadcrumbs from './index';

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  title: 'Components/Breadcrumbs',
  tags: ['autodocs'],
};

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  render: () => {
    return (
      <Breadcrumbs>
        <ProjectBreadcrumb projectSlug="fortytwo" />
      </Breadcrumbs>
    );
  },
};

export const WithEnvironment: Story = {
  render: () => {
    return (
      <Breadcrumbs>
        <ProjectBreadcrumb projectSlug="fortytwo" />
        <EnvironmentBreadcrumb environmentSlug="production" projectSlug="fortytwo" />
      </Breadcrumbs>
    );
  },
};

export default meta;
