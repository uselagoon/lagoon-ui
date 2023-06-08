import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { graphql } from 'msw';

import { generateProjectInfo } from '../../.storybook/mocks/mocks';
import PageProject from '../pages/project';

const meta: Meta<typeof PageProject> = {
  title: 'Pages/Project',
  component: PageProject,
};
type Story = StoryObj<typeof PageProject>;

export const Default: Story = {
  args: {
    router: { query: { projectName: 'project' } },
  },
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(ctx.delay(), ctx.data({ project: generateProjectInfo() }));
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
