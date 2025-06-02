import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, delay, graphql } from 'msw';

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

type ResponseType = {
  organization: typeof mockOrganization;
};

type AddMutationResponseType = {
  addGroup: {};
};
type RemoveMutationResponseType = {
  deleteGroup: {};
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getOrganization', () => {
          delay(1000);

          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              organization: mockOrganization,
            },
          });
        }),

        graphql.mutation('addGroup', ({ variables }) => {
          const { group } = variables;

          const newGroup = {
            __typename: 'Group',
            name: group,
            id: faker.lorem.slug(),
            members: [],
            type: 'null',
            memberCount: 0,
          };

          // "add" into the mock group for future refetch
          mockOrganization.groups = [newGroup, ...mockOrganization.groups];

          delay();
          return HttpResponse.json<{ data: AddMutationResponseType }>({
            data: {
              addGroup: mockOrganization,
            },
          });
        }),

        graphql.mutation('deleteGroup', ({ variables }) => {
          const { groupName } = variables;

          mockOrganization.groups = mockOrganization.groups.filter(g => g.name !== groupName);

          delay();
          return HttpResponse.json<{ data: RemoveMutationResponseType }>({
            data: {
              deleteGroup: {},
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
