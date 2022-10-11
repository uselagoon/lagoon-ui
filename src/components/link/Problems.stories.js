import React from 'react';
import mocks, { seed } from '../../../.storybook/mocks';
import ProblemsLink from './Problems';

export default {
  component: ProblemsLink,
  title: 'Components/link/ProblemsLink',
};

seed();
const environment = mocks.Environment();

export const Default = () => (
  <ProblemsLink
    environmentSlug={environment.openshiftProjectName}
    projectSlug={environment.project.name}
  >
    Problems link
  </ProblemsLink>
);
