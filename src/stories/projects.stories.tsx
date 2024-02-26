import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { graphql } from 'msw';

import { MockAllProjects } from '../../.storybook/mocks/api';
import ProjectsPage from '../pages/projects';

const meta: Meta<typeof ProjectsPage> = {
  title: 'Pages/Projects',
  component: ProjectsPage,
};
type Story = StoryObj<typeof ProjectsPage>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('AllProjectsQuery', (_, res, ctx) => {
          return res(ctx.delay(), ctx.data({ allProjects: MockAllProjects(123) }));
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
          return res(ctx.delay('infinite'));
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(ctx.status(403));
        }),
      ],
    },
  },
  render: () => {
    return <QueryError error="Error" />;
  },
};
export default meta;
