import React from 'react';

import EnvironmentBreadcrumb from './Environment';
import ProjectBreadcrumb from './Project';
import Breadcrumbs from './index';

export default {
  component: Breadcrumbs,
  title: 'Components/Breadcrumbs',
};

export const Default = () => (
  <Breadcrumbs>
    <ProjectBreadcrumb projectSlug="fortytwo" />
  </Breadcrumbs>
);

export const WithEnvironment = () => (
  <Breadcrumbs>
    <ProjectBreadcrumb projectSlug="fortytwo" />
    <EnvironmentBreadcrumb environmentSlug="production" />
  </Breadcrumbs>
);
