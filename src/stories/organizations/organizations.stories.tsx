import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, delay, graphql } from 'msw';

import { getOrganization } from '../../../.storybook/mocks/api';
import OrganizationsPage from '../../pages/organizations';

const meta: Meta<typeof OrganizationsPage> = {
  title: 'Pages/Organizations/AllOrganizations',
  component: OrganizationsPage,
};
type Story = StoryObj<typeof OrganizationsPage>;

const allOrganizations = [getOrganization()];

type ResponseType = {
  allOrganizations: typeof allOrganizations;
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation(() => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              allOrganizations,
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
