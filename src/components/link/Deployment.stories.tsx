import { faker } from '@faker-js/faker';
import React from 'react';

import DeploymentLink from './Deployment';

export default {
  component: DeploymentLink,
  title: 'Components/link/DeploymentLink',
};

faker.seed(123);

const deployment = {
  name: faker.lorem.slug(),
  environment:{
    openshiftProjectName: faker.lorem.slug(),
    project:{
      name: faker.lorem.slug(),
    }
  }
}
export const Default = () => (
  <DeploymentLink
    deploymentSlug={deployment.name}
    environmentSlug={deployment.environment.openshiftProjectName}
    projectSlug={deployment.environment.project.name}
  >
    Deployment link
  </DeploymentLink>
);
