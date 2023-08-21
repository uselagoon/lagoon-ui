import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';

import { getOrganization } from '../../../.storybook/mocks/api';
import PageGroup from '../../pages/organizations/group';

faker.seed(123);

const fakeQueryParams = {
  organizationName: 'Test Org',
  organizationSlug: faker.lorem.slug(),
  groupName: 'Organization-group',
};

const meta: Meta<typeof PageGroup> = {
  title: 'Pages/Organizations/Group',
  component: PageGroup,
  args: {
    router: {
      query: fakeQueryParams,
    },
  },
};

type Story = StoryObj<typeof PageGroup>;

const mockOrganization = getOrganization();

const mockGroup = mockOrganization.groups[0];

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getGroup', (_, res, ctx) => {
          return res(ctx.delay(), ctx.data({ group: mockGroup, organization: mockOrganization }));
        }),

        graphql.mutation('addUserToGroup', (req, res, ctx) => {
          const { email, role } = req.variables;

          // add the new user to the mock
          mockGroup.members.push({
            role,
            __typename: 'GroupMembership',
            user: {
              email,
              comment: 'A user',
              __typename: 'User',
            },
          });
          return res(ctx.delay(), ctx.data({ addUserToGroup: {} }));
        }),

        graphql.mutation('removeUserFromGroup', (req, res, ctx) => {
          const { email } = req.variables;
          mockGroup.members = mockGroup.members.filter(g => g.user.email !== email);
          return res(ctx.delay(), ctx.data({ removeUserFromGroup: {} }));
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
