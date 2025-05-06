import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { HttpResponse, delay, graphql } from 'msw';

import { generateBackups, generateEnvironments, seed } from '../../.storybook/mocks/mocks';
import PageBackups from '../pages/backups';

const meta: Meta<typeof PageBackups> = {
  title: 'Pages/Backups',
  component: PageBackups,
};
type Story = StoryObj<typeof PageBackups>;

seed();

const environmentResponse = { ...generateEnvironments(), backups: generateBackups(123) };
const environmentResponseEmptyBackups = { ...generateEnvironments(), backups: [] };

type ResponseType = {
  environment: typeof environmentResponse;
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getEnvironment', () => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              environment: environmentResponse,
            },
          });
        }),
      ],
    },
  },
};

export const NoBackups: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getEnvironment', () => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              environment: environmentResponseEmptyBackups,
            },
          });
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation(() => {
          return delay('infinite');
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation(() => {
          return new HttpResponse('', { status: 403 });
        }),
      ],
    },
  },
  render: () => {
    return <QueryError error="Error" />;
  },
};

export default meta;
