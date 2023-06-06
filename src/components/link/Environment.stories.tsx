import React from 'react';

import { generateEnvironments } from '../../../.storybook/mocks/mocks';

import EnvironmentLink from './Environment';

export default {
  component: EnvironmentLink,
  title: 'Components/link/EnvironmentLink',
};

const environment = generateEnvironments();

export const Default = () => (
  <EnvironmentLink environmentSlug={environment.openshiftProjectName} projectSlug={environment.project.name}>
    Environment link
  </EnvironmentLink>
);
