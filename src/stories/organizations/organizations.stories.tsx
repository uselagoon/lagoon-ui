import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';

import { getOrganization } from '../../../.storybook/mocks/api';
import OrganizationsPage from '../../pages/organizations/organizations';

const meta: Meta<typeof OrganizationsPage> = {
  title: 'Pages/Organizations/AllOrganizations',
  component: OrganizationsPage,
};
type Story = StoryObj<typeof OrganizationsPage>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(ctx.delay(), ctx.data({ allOrganizations: [getOrganization()] }));
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
