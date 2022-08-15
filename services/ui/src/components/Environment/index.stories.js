import React from 'react';
import mocks, { seed } from 'mock_data/mocks';
import Environment from './index';

export default {
  component: Environment,
  title: 'Components/Environment',
}

seed();
const data = mocks.Environment();

export const Default = () => (
  <Environment
    environment={data}
  />
);
