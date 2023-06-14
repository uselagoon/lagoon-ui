import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { graphql } from 'msw';

import { ProjectsProblems } from '../../.storybook/mocks/api';
import ProblemsDashboardProductPageHexDisplay from '../pages/problems-dashboard-by-project-hex';

const meta: Meta<typeof ProblemsDashboardProductPageHexDisplay> = {
  title: 'Pages/Problems by hex',
  component: ProblemsDashboardProductPageHexDisplay,
};
type Story = StoryObj<typeof ProblemsDashboardProductPageHexDisplay>;

console.log(ProjectsProblems());

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getAllProjectsProblemsQuery', (_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              projectsProblems: ProjectsProblems(),
            })
          );
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
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
