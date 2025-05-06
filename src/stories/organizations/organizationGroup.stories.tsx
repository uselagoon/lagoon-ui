import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, delay, graphql } from 'msw';

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

type ResponseType = {
  group: typeof mockGroup;
  organization: typeof mockOrganization;
};

type AddMutationResponseType = {
  addUserToGroup: {};
};
type RemoveMutationResponseType = {
  removeUserFromGroup: {};
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getGroup', () => {
          delay();

          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              group: mockGroup,
              organization: mockOrganization,
            },
          });
        }),

        graphql.mutation('addUserToGroup', ({ variables }) => {
          const { email, role } = variables;

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
          delay();

          return HttpResponse.json<{ data: AddMutationResponseType }>({
            data: {
              addUserToGroup: {},
            },
          });
        }),

        graphql.mutation('removeUserFromGroup', ({ variables }) => {
          const { email } = variables;
          mockGroup.members = mockGroup.members.filter(g => g.user.email !== email);

          delay();
          return HttpResponse.json<{ data: RemoveMutationResponseType }>({
            data: {
              removeUserFromGroup: {},
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
