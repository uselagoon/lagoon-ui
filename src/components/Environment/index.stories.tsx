import React from 'react';

import { generateEnvironments, generateProjectInfo } from '../../../.storybook/mocks/mocks';

import Environment from './index';

export default {
  component: Environment,
  title: 'Components/Environment',
};


const data = generateEnvironments();
data.project = generateProjectInfo();

export const Default = () => <Environment environment={data} />;
