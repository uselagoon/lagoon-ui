import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, delay, graphql } from 'msw';

import { ProblemIdentifier, generateEnvironments } from '../../.storybook/mocks/mocks';
import PageProblems from '../pages/problems';

const meta: Meta<typeof PageProblems> = {
  title: 'Pages/ProblemsPage',
  component: PageProblems,
};
type Story = StoryObj<typeof PageProblems>;

faker.seed(123);

const fakeQueryParams = {
  openshiftProjectName: faker.helpers.arrayElement(['main', 'branch']),
  deploymentName: faker.lorem.slug(),
};

const problemData = Array.from({
  length: faker.number.int({
    min: 1,
    max: 10,
  }),
}).map((_, idx) => {
  return ProblemIdentifier(idx);
})[0].problems;

const duplicateProblemsAcrossServices = [
  { ...problemData[0], service: 'cli' },
  { ...problemData[0], service: 'php-nginx' },
  { ...problemData[1], service: 'cli' },
  { ...problemData[1], service: 'node' },
  { ...problemData[1], service: 'service' },
];

const environmentResponse = { ...generateEnvironments(), problems: problemData };

const environmentResponseDuplicateData = { ...generateEnvironments(), problems: duplicateProblemsAcrossServices };

type ResponseType = {
  environment: typeof environmentResponse;
};

export const Default: Story = {
  args: {
    router: {
      query: fakeQueryParams,
    },
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query('getEnvironment', () => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              environment: environmentResponse,
            },
          });
        }),
      ],
    },
  },
};

export const DuplicateData: Story = {
  args: {
    router: {
      query: fakeQueryParams,
    },
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query('getEnvironment', () => {
          delay();
          return HttpResponse.json<{ data: ResponseType }>({
            data: {
              environment: environmentResponseDuplicateData,
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
