import React from 'react';

import { getDeployment } from '../../../.storybook/mocks/mocks';
import Deployment from './index';
import withButtonOverrides from '../../../.storybook/decorators/withButtonOverrides';

export default {
  component: Deployment,
  title: 'Components/Deployment',
  tags: ['autodocs'],
  decorators: [withButtonOverrides('.btn:not(div.field .btn)', 'click', 'Cancel deployment click')],
};


const data = getDeployment(123);


export const Complete = () => (
  <Deployment
    deployment={{
      ...data,
      status: 'complete',
    }}
  />
);

export const New = () => (
  <Deployment
    deployment={{
      ...data,
      status: 'new',
      started: null,
      completed: data.created,
    }}
  />
);

export const Pending = () => (
  <Deployment
    deployment={{
      ...data,
      status: 'pending',
      started: null,
    }}
  />
);

export const Running = () => (
  <Deployment
    deployment={{
      ...data,
      status: 'running',
    }}
  />
);

export const Cancelled = () => (
  <Deployment
    deployment={{
      ...data,
      status: 'cancelled',
    }}
  />
);

export const Error = () => (
  <Deployment
    deployment={{
      ...data,
      status: 'error',
    }}
  />
);

export const Failed = () => (
  <Deployment
    deployment={{
      ...data,
      status: 'failed',
    }}
  />
);
