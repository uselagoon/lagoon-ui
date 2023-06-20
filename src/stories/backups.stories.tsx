import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { graphql } from 'msw';

import { generateBackups, generateEnvironments, seed } from '../../.storybook/mocks/mocks';
import PageBackups from '../pages/backups';

const meta: Meta<typeof PageBackups> = {
  title: 'Pages/Backups',
  component: PageBackups,
};
type Story = StoryObj<typeof PageBackups>;

seed();
export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getEnvironment', (_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              environment: { ...generateEnvironments(), backups: generateBackups(123) },
            })
          );
        }),
      ],
    },
  },
};

export const NoBackups: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getEnvironment', (_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              environment: { ...generateEnvironments(), backups: [] },
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
