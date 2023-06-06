import React from 'react';

import { generateEnvironments } from '../../../.storybook/mocks/mocks';
import FactsLink from './Facts';

export default {
  component: FactsLink,
  title: 'Components/link/FactsLink',
};

const environment = generateEnvironments();

export const Default = () => (
  <FactsLink environmentSlug={environment.openshiftProjectName} projectSlug={environment.project.name}>
    Problems link
  </FactsLink>
);
