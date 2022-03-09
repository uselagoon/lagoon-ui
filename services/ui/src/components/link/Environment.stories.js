import React from 'react';
import mocks, { seed } from 'mock_data/mocks';
import EnvironmentLink from './Environment';

export default {
  component: EnvironmentLink,
  title: 'Components/link/EnvironmentLink',
};

seed();
const environment = mocks.Environment();

export const Default = () => (
  <EnvironmentLink
    environmentSlug={environment.environmentSlug}
    projectSlug={environment.project.name}
  >
    Environment link
  </EnvironmentLink>
);
