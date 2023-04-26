import React, { FC } from 'react';

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import { getLinkData } from 'components/link/Environment';

interface EnvironmentBreadcrumbProps {
  environmentSlug: string;
  projectSlug: string;
}

const EnvironmentBreadcrumb: FC<EnvironmentBreadcrumbProps> = ({ environmentSlug, projectSlug }) => {
  const linkData = getLinkData(environmentSlug, projectSlug);

  return <Breadcrumb header="Environment" title={environmentSlug} {...linkData} />;
};

export default EnvironmentBreadcrumb;
