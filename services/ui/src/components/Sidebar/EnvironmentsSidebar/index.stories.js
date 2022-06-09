import React from 'react';
import mocks, { seed } from 'mock_data/mocks';
import EnvironmentsSidebar from './index';

export default {
  component: EnvironmentsSidebar,
  title: 'Components/EnvironmentsSidebar',
}

seed();
const environment = mocks.Environment();

export const Default = () => (
  <EnvironmentsSidebar
    environment={environment}
  />
);
