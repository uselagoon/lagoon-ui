import React, { FC } from 'react';

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import { getLinkData } from 'components/link/BulkDeployment';

const BulkDeploymentBreadcrumb: FC<{ title: string; bulkIdSlug: string }> = ({ title, bulkIdSlug }) => {
  const linkData = getLinkData(bulkIdSlug);

  return <Breadcrumb header="Bulk Deployment" title={title} {...linkData} />;
};

export default BulkDeploymentBreadcrumb;
