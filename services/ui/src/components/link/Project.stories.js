import React from 'react';
import mocks, { seed } from 'mock_data/mocks';
import ProjectLink from './Project';

export default {
  component: ProjectLink,
  title: 'Components/link/ProjectLink',
};

seed();
const environment = mocks.Environment();

export const Default = () => (
  <ProjectLink
    projectSlug={environment.project.name}
  >
    Project link
  </ProjectLink>
);
