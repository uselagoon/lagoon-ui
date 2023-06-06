import React from 'react';

import { faker } from '@faker-js/faker';
import { generateEnvironments } from '../../../.storybook/mocks/mocks';
import TaskLink from './Task';

export default {
  component: TaskLink,
  title: 'Components/link/TaskLink',
};

faker.seed();

const task = {
  id: faker.lorem.slug(),
  environment: generateEnvironments(),
};

export const Default = () => (
  <TaskLink
    taskSlug={task.id}
    environmentSlug={task.environment.openshiftProjectName}
    projectSlug={task.environment.project.name}
  >
    Task link
  </TaskLink>
);
