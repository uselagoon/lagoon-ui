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
    ...getDeployment(),
    status: 'complete',
    bulkId: '',
  },
  {
    ...getDeployment(),
    status: 'complete',
    bulkId: '',
  },
  {
    ...getDeployment(),
    status: 'complete',
    bulkId: '123',
  },
  {
    ...getDeployment(),
    status: 'complete',
    bulkId: '123',
  },
];

faker.seed();
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
