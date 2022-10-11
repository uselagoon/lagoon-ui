import React from 'react';
import mocks, { seed } from '../../../.storybook/mocks';
import ProjectDetailsSidebar from './index';

export default {
  component: ProjectDetailsSidebar,
  title: 'Components/ProjectDetailsSidebar',
}

seed();
const project = mocks.Project();

export const Default = () => (
  <ProjectDetailsSidebar
    project={project}
  />
);
