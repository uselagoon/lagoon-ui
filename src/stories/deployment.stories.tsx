import React from 'react';

import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import QueryError from 'components/errors/QueryError';
import { graphql } from 'msw';

import { generateEnvironments, getDeployment } from '../../.storybook/mocks/mocks';
import PageDeployment from '../pages/deployment';

const meta: Meta<typeof PageDeployment> = {
  title: 'Pages/Deployment',
  component: PageDeployment,
};
type Story = StoryObj<typeof PageDeployment>;

faker.seed(123);
const fakeQueryParams = {
  openshiftProjectName: faker.helpers.arrayElement(['main', 'branch']),
  deploymentName: faker.lorem.slug(),
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.mutation('cancelDeployment', (_, res, ctx) => {
          return res(
            ctx.delay(1000),
            ctx.data({
              cancelDeployment: 'success',
            })
          );
        }),
        graphql.operation((_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              environment: { ...generateEnvironments(123), deployments: [getDeployment(22)] },
            })
          );
        }),
      ],
    },
  },
};

export const Loading: Story = {
  args: {
    router: {
      asPath: '/projects/lagoon-deploy-123',
      query: fakeQueryParams,
    },
  },
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

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(ctx.status(403));
        }),
      ],
    },
  },
  render: () => {
    return <QueryError error="Error" />;
  },
};

export default meta;
