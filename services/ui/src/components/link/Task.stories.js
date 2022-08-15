import React from 'react';
import mocks, { seed } from 'mock_data/mocks';
import TaskLink from './Task';

export default {
  component: TaskLink,
  title: 'Components/link/TaskLink',
};

seed();
const task = mocks.Task();

export const Default = () => (
  <TaskLink
    taskId={task.id}
    environmentSlug={task.environment.openshiftProjectName}
    projectSlug={task.environment.project.name}
  >
    Task link
  </TaskLink>
);
