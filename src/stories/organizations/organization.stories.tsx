import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, delay, graphql } from 'msw';

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

const organizationResponse = getOrganization();

type ResponseType = {
  organization: typeof organizationResponse;
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getOrganization', () => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              organization: organizationResponse,
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
