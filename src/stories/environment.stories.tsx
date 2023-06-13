import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';

import { generateEnvironments, generateProjectInfo } from '../../.storybook/mocks/mocks';
import PageEnvironment from '../pages/environment';

const fakeQueryParams = {
  openshiftProjectName: faker.helpers.arrayElement(['main', 'branch']),
  deploymentName: faker.lorem.slug(),
};

const meta: Meta<typeof PageEnvironment> = {
  title: 'Pages/Environment',
  component: PageEnvironment,
  args: {
    router: {
      asPath: '/projects/lagoon-deploy-123',
      query: fakeQueryParams,
    },
  },
};
type Story = StoryObj<typeof PageEnvironment>;

faker.seed();
const environment = generateEnvironments(123);
// @ts-ignore
environment.project = generateProjectInfo();

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              environment,
            })
          );
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

export const EnvironmentNotFound: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.operation((_, res, ctx) => {
          return res(
            ctx.delay(),
            ctx.data({
              environment: null,
            })
          );
        }),
      ],
    },
  },
};

export default meta;
