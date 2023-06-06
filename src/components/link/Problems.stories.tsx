import React from 'react';

import { generateEnvironments } from '../../../.storybook/mocks/mocks';
import ProblemsLink from './Problems';

export default {
  component: ProblemsLink,
  title: 'Components/link/ProblemsLink',
};

const environment = generateEnvironments();

export const Default = () => (
  <ProblemsLink environmentSlug={environment.openshiftProjectName} projectSlug={environment.project.name}>
    Problems link
  </ProblemsLink>
);
