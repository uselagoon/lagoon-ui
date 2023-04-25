import React, { FC } from 'react';

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import { getLinkData } from 'components/link/Deployment';

interface DeploymentBreadcrumbProps {
  deploymentSlug: string;
  environmentSlug: string;
  projectSlug: string;
}

const DeploymentBreadcrumb: FC<DeploymentBreadcrumbProps> = ({ deploymentSlug, environmentSlug, projectSlug }) => {
  const linkData = getLinkData(deploymentSlug, environmentSlug, projectSlug);

  return <Breadcrumb header="Deployment" title={deploymentSlug} {...linkData} />;
};

export default DeploymentBreadcrumb;
