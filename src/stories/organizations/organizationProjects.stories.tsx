import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, delay, graphql } from 'msw';

import { getOrganization } from '../../../.storybook/mocks/api';
import { organizationProjects } from '../../../.storybook/mocks/mocks';
import PageProjects from '../../pages/organizations/projects';

faker.seed(123);

const fakeQueryParams = {
  organizationName: 'Test Org',
};

const meta: Meta<typeof PageProjects> = {
  title: 'Pages/Organizations/Projects',
  component: PageProjects,
  args: {
    router: {
      query: fakeQueryParams,
    },
  },
};
type Story = StoryObj<typeof PageProjects>;

const mockOrganization = getOrganization();

type ResponseType = {
  organization: typeof mockOrganization;
};

type RemoveMutationResponseType = {
  deleteProject: {};
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getOrganization', () => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              organization: mockOrganization,
            },
          });
        }),

        graphql.mutation('deleteProject', ({ variables }) => {
          const { project } = variables;

          mockOrganization.projects = mockOrganization.projects.filter(p => p.name !== project);

          delay();
          return HttpResponse.json<{ data: RemoveMutationResponseType }>({
            data: {
              deleteProject: {},
            },
          });
        }),

        graphql.operation(({ variables }) => {
          // unnamed mutation

          const { name } = variables;

          const newProject = organizationProjects(2)[0];
          (newProject.name = name), (mockOrganization.projects = [newProject, ...mockOrganization.projects]);
          delay();
          return HttpResponse.json<{}>({
            data: {},
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

export default meta;
