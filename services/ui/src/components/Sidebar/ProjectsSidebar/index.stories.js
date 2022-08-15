import React from 'react';
import mocks, { seed } from 'mock_data/mocks';
import ProjectsSidebar from './index';

export default {
  component: ProjectsSidebar,
  title: 'Components/ProjectsSidebar',
}

seed();
const project = mocks.Project();

export const Default = () => (
  <ProjectsSidebar
    project={project}
  />
);
