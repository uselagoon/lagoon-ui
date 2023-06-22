import React from 'react';

import { generateEnvironments, generateProjectInfo, seed } from '../../../.storybook/mocks/mocks';

import Environment from './index';

export default {
  component: Environment,
  title: 'Components/Environment',
};

seed();
const data = generateEnvironments();
//@ts-ignore
data.project = generateProjectInfo();

export const Default = () => <Environment environment={data} />;
