import React from 'react';

import { generateEnvironments } from '../../../.storybook/mocks/mocks';
import TasksLink from './Tasks';

export default {
  component: TasksLink,
  title: 'Components/link/TasksLink',
};

const environment = generateEnvironments();

export const Default = () => (
  <TasksLink environmentSlug={environment.openshiftProjectName} projectSlug={environment.project.name}>
    Tasks link
  </TasksLink>
);
