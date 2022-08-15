import React from 'react';
import mocks, { seed } from 'mock_data/mocks';
import ProjectDetailsHeader from './index';

export default {
  component: ProjectDetailsHeader,
  title: 'Components/ProjectDetailsHeader',
}

seed();
const project = mocks.Project();

export const Default = () => (
  <ProjectDetailsHeader
    project={project}
  />
);
