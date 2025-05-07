import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { HttpResponse, delay, graphql } from 'msw';

import { MockAllProjects } from '../../.storybook/mocks/api';
import ProjectsPage from '../pages/projects';

const meta: Meta<typeof ProjectsPage> = {
  title: 'Pages/Projects',
  component: ProjectsPage,
};
type Story = StoryObj<typeof ProjectsPage>;

const allProjectsResponse = MockAllProjects(123);

type ResponseType = {
  allProjects: typeof allProjectsResponse;
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('AllProjectsQuery', () => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              allProjects: allProjectsResponse,
            },
          });
        }),
      ],
    },
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('AllProjectsQuery', () => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              allProjects: [],
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
        graphql.query('AllProjectsQuery', () => {
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
