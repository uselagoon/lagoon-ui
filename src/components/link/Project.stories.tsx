import React from 'react';

import { generateEnvironments } from '../../../.storybook/mocks/mocks';
import ProjectLink from './Project';

export default {
  component: ProjectLink,
  title: 'Components/link/ProjectLink',
};

const environment = generateEnvironments();

export const Default = () => <ProjectLink projectSlug={environment.project.name}>Project link</ProjectLink>;
