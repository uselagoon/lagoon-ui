import React from 'react';

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import { getLinkData } from 'components/link/Project';

const ProjectBreadcrumb = ({ projectSlug }: { projectSlug: string }) => {
  const linkData = getLinkData(projectSlug);

  return <Breadcrumb header="Project" title={projectSlug} {...linkData} />;
};

export default ProjectBreadcrumb;
