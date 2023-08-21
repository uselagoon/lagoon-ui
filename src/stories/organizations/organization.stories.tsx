import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';

import { getOrganization } from '../../../.storybook/mocks/api';
import PageOrganization from '../../pages/organizations/organization';

faker.seed(123);

const fakeQueryParams = {
  organizationName: 'Test Org',
  organizationSlug: faker.lorem.slug(),
};

const meta: Meta<typeof PageOrganization> = {
  title: 'Pages/Organizations/Overview',
  component: PageOrganization,
  args: {
    router: {
      query: fakeQueryParams,
    },
  },
};
type Story = StoryObj<typeof PageOrganization>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getOrganization', (_, res, ctx) => {
          return res(ctx.delay(), ctx.data({ organization: getOrganization() }));
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
