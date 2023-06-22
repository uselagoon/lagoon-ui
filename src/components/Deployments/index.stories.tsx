import React from 'react';

import { faker } from '@faker-js/faker';

import { getDeployment } from '../../../.storybook/mocks/mocks';
import Deployments from './index';

export default {
  component: Deployments,
  title: 'Components/Deployments',
};

const data = [
  {
    ...getDeployment(1),
    status: 'complete',
    bulkId: '',
  },
  {
    ...getDeployment(2),
    status: 'complete',
    bulkId: '',
  },
  {
    ...getDeployment(3),
    status: 'complete',
    bulkId: '123',
  },
  {
    ...getDeployment(4),
    status: 'complete',
    bulkId: '123',
  },
];

faker.seed(123);
const environmentsSlug = faker.lorem.slug();
const projectSlug = faker.lorem.slug();

export const Complete = () => (
  <Deployments deployments={data} environmentSlug={environmentsSlug} projectSlug={projectSlug} />
);

export const NoDeployments = () => (
  <Deployments deployments={[]} environmentSlug={environmentsSlug} projectSlug={projectSlug} />
);

export const New = () => (
  <Deployments
    environmentSlug={environmentsSlug}
    projectSlug={projectSlug}
    deployments={[
      {
        ...data[0],
        status: 'new',
      },
    ]}
  />
);

export const Pending = () => (
  <Deployments
    environmentSlug={environmentsSlug}
    projectSlug={projectSlug}
    deployments={[
      {
        ...data[0],
        status: 'pending',
      },
    ]}
  />
);

export const Running = () => (
  <Deployments
    environmentSlug={environmentsSlug}
    projectSlug={projectSlug}
    deployments={[
      {
        ...data[0],
        status: 'running',
      },
    ]}
  />
);

export const Cancelled = () => (
  <Deployments
    environmentSlug={environmentsSlug}
    projectSlug={projectSlug}
    deployments={[
      {
        ...data[0],
        status: 'cancelled',
      },
    ]}
  />
);

export const Error = () => (
  <Deployments
    environmentSlug={environmentsSlug}
    projectSlug={projectSlug}
    deployments={[
      {
        ...data[0],
        status: 'error',
      },
    ]}
  />
);

export const Failed = () => (
  <Deployments
    environmentSlug={environmentsSlug}
    projectSlug={projectSlug}
    deployments={[
      {
        ...data[0],
        status: 'failed',
      },
    ]}
  />
);
