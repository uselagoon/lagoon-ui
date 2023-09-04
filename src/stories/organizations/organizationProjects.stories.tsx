import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { graphql } from 'msw';

import { getOrganization } from '../../../.storybook/mocks/api';
import { organizationProjects } from '../../../.storybook/mocks/mocks';
import PageProjects from '../../pages/organizations/projects';

faker.seed(123);

const fakeQueryParams = {
  organizationName: 'Test Org',
};

const meta: Meta<typeof PageProjects> = {
  title: 'Pages/Organizations/Projects',
  component: PageProjects,
  args: {
    router: {
      query: fakeQueryParams,
    },
  },
};
type Story = StoryObj<typeof PageProjects>;

const mockOrganization = getOrganization();

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('getOrganization', (_, res, ctx) => {
          return res(ctx.delay(), ctx.data({ organization: mockOrganization }));
        }),

        graphql.mutation('deleteProject', (req, res, ctx) => {
          const { project } = req.variables;

          mockOrganization.projects = mockOrganization.projects.filter(p => p.name !== project);

          return res(ctx.delay(), ctx.data({ deleteProject: {} }));
        }),

        graphql.operation((req, res, ctx) => {
          // unnamed mutation

          const { name } = req.variables;

          const newProject = organizationProjects(2)[0];
          (newProject.name = name), (mockOrganization.projects = [newProject, ...mockOrganization.projects]);
          return res(ctx.delay(), ctx.data({}));
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
