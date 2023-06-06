import React, { useEffect } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';

import { MockAllProjects } from '../../.storybook/mocks/api';
import ProjectsPage from '../pages/projects';

const meta: Meta<typeof ProjectsPage> = {
  title: 'Pages/ProjectsPage',
  component: ProjectsPage,
};
type Story = StoryObj<typeof ProjectsPage>;


export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('AllProjectsQuery', (_, res, ctx) => {
          return res(ctx.delay(),ctx.data({ allProjects: MockAllProjects(123) }));
        }),
      ],
    },
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('AllProjectsQuery', (_, res, ctx) => {
          return res(ctx.data({ allProjects: [] }));
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('AllProjectsQuery', (_, res, ctx) => {
          return res(ctx.delay('infinite'), ctx.data({ allProjects: [] }));
        }),
      ],
    },
  },
  decorators: [
    Story => {
      useEffect(() => {
        return () => window.location.reload();
      }, []);

      return <Story />;
    },
  ],
};

export default meta;
