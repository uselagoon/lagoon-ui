import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';

import { getOrganization } from '../../../.storybook/mocks/api';
import { organizationGroups } from '../../../.storybook/mocks/mocks';
import PageProject from '../../pages/organizations/project';

faker.seed(123);

const mockOrganization = getOrganization();

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

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getOrganization', (_, res, ctx) => {
          return res(ctx.delay(), ctx.data({ organization: mockOrganization }));
        }),

        graphql.mutation('addProjectToGroup', (req, res, ctx) => {
          const { groupName } = req.variables;
          const newGroup = organizationGroups()[0];
          newGroup.name = groupName;
          newGroup.type = 'null';

          mockOrganization.projects[0].groups = [newGroup, ...mockOrganization.projects[0].groups];

          return res(ctx.delay(), ctx.data({ addProjectToGroup: {} }));
        }),

        graphql.mutation('removeGroupFromProject', (req, res, ctx) => {
          const { groupName } = req.variables;
          mockOrganization.projects[0].groups = mockOrganization.projects[0].groups.filter(g => g.name !== groupName);

          return res(ctx.delay(), ctx.data({ removeGroupFromProject: {} }));
        }),

        graphql.mutation('addNotificationToProject', (req, res, ctx) => {
          const { notificationName, notificationType } = req.variables;

          mockOrganization.projects[0].notifications.push({
            name: notificationName,
            __typename: notificationType,
            webhook: '',
            channel: '',
            type: notificationType,
          });

          return res(ctx.delay(), ctx.data({ addNotificationToProject: {} }));
        }),

        graphql.mutation('removeNotificationFromProject', (req, res, ctx) => {
          const { notificationName } = req.variables;

          mockOrganization.projects[0].notifications.filter(n => n.name !== notificationName);

          return res(ctx.delay(), ctx.data({ removeNotificationFromProject: {} }));
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

export default meta;
