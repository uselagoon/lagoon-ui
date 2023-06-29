import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';

import { getOrganization } from '../../../.storybook/mocks/api';
import PageGroups from '../../pages/organizations/groups';

faker.seed(123);

const fakeQueryParams = {
  organizationName: 'Test Org',
  organizationSlug: faker.lorem.slug(),
};

const meta: Meta<typeof PageGroups> = {
  title: 'Pages/Organizations/Groups',
  component: PageGroups,
  args: {
    router: {
      query: fakeQueryParams,
    },
  },
};
type Story = StoryObj<typeof PageGroups>;

const mockOrganization = getOrganization();

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getOrganization', (_, res, ctx) => {
          return res(ctx.delay(), ctx.data({ organization: mockOrganization }));
        }),

        graphql.mutation('addGroup', (req, res, ctx) => {
          const { group } = req.variables;

          const newGroup = { __typename: 'Group', name: group, id: faker.lorem.slug(), members: [], type: 'null' };

          // "add" into the mock group for future refetch
          mockOrganization.groups = [newGroup, ...mockOrganization.groups];

          return res(ctx.delay(), ctx.data({ addGroup: newGroup }));
        }),

        graphql.mutation('deleteGroup', (req, res, ctx) => {
          const { groupName } = req.variables;

          mockOrganization.groups = mockOrganization.groups.filter(g => g.name !== groupName);

          return res(ctx.delay(), ctx.data({ deleteGroup: {} }));
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
