import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { HttpResponse, delay, graphql } from 'msw';

import { generateProjectInfo, seed } from '../../.storybook/mocks/mocks';
import PageProject from '../pages/project';

const meta: Meta<typeof PageProject> = {
  title: 'Pages/Project',
  component: PageProject,
};
type Story = StoryObj<typeof PageProject>;

seed();

const projectResponse = generateProjectInfo();

type ResponseType = {
  project: typeof projectResponse;
};

export const Default: Story = {
  args: {
    router: { query: { projectName: 'project' } },
  },
  parameters: {
    msw: {
      handlers: [
        graphql.operation(() => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              project: projectResponse,
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
