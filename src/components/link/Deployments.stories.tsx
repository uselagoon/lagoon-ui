import React from 'react';

import { generateEnvironments } from '../../../.storybook/mocks/mocks';

import DeploymentsLink from './Deployments';

export default {
  component: DeploymentsLink,
  title: 'Components/link/DeploymentsLink',
};

const environment = generateEnvironments();

export const Default = () => (
  <DeploymentsLink environmentSlug={environment.openshiftProjectName} projectSlug={environment.project.name}>
    Deployments link
  </DeploymentsLink>
);
