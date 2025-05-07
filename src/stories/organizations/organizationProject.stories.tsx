import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, delay, graphql } from 'msw';

import { getOrganization } from '../../../.storybook/mocks/api';
import { organizationGroups, organizationProjects } from '../../../.storybook/mocks/mocks';
import PageProject from '../../pages/organizations/project';

faker.seed(123);

const mockOrganization = getOrganization();
const mockOrganizationWithProject = { organization: mockOrganization, project: organizationProjects(2)[0] };

const fakeQueryParams = {
  organizationName: 'Test Org',
  organizationSlug: faker.lorem.slug(),
  projectName: mockOrganization.projects[0].name,
};

const meta: Meta<typeof PageProject> = {
  title: 'Pages/Organizations/Project',
  component: PageProject,
  args: {
    router: {
      query: fakeQueryParams,
    },
  },
};

type Story = StoryObj<typeof PageProject>;

type ResponseType = typeof mockOrganizationWithProject;

type AddMutationResponseType<T extends string> = {
  [K in T]: {};
};

type RemoveMutationResponseType = {
  removeNotificationFromProject: {};
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getOrganization', () => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              ...mockOrganizationWithProject,
            },
          });
        }),

        graphql.mutation('addProjectToGroup', ({ variables }) => {
          const { groupName } = variables;
          const newGroup = organizationGroups()[0];
          newGroup.name = groupName;
          newGroup.type = 'null';

          mockOrganization.projects[0].groups = [newGroup, ...mockOrganization.projects[0].groups];

          delay();
          return HttpResponse.json<{ data: AddMutationResponseType<'addProjectToGroup'> }>({
            data: {
              addProjectToGroup: {},
            },
          });
        }),

        graphql.mutation('removeGroupFromProject', ({ variables }) => {
          const { groupName } = variables;
          mockOrganization.projects[0].groups = mockOrganization.projects[0].groups.filter(g => g.name !== groupName);

          delay();
          return HttpResponse.json<{ data: AddMutationResponseType<'removeGroupFromProject'> }>({
            data: {
              removeGroupFromProject: {},
            },
          });
        }),

        graphql.mutation('addNotificationToProject', ({ variables }) => {
          const { notificationName, notificationType } = variables;

          mockOrganization.projects[0].notifications.push({
            name: notificationName,
            __typename: notificationType,
            webhook: '',
            channel: '',
            type: notificationType,
          });
          delay();
          return HttpResponse.json<{ data: AddMutationResponseType<'addNotificationToProject'> }>({
            data: {
              addNotificationToProject: {},
            },
          });
        }),

        graphql.mutation('removeNotificationFromProject', ({ variables }) => {
          const { notificationName } = variables;

          mockOrganization.projects[0].notifications.filter(n => n.name !== notificationName);

          delay();
          return HttpResponse.json<{ data: RemoveMutationResponseType }>({
            data: {
              removeNotificationFromProject: {},
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

export default meta;
