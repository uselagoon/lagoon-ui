import React, { FC } from "react";
import { getLinkData } from "components/link/BulkDeployment";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";

const BulkDeploymentBreadcrumb: FC<{ title: string; bulkIdSlug: string }> = ({
  title,
  bulkIdSlug,
}) => {
  const linkData = getLinkData(bulkIdSlug);

  return <Breadcrumb header="Bulk Deployment" title={title} {...linkData} />;
};

export default BulkDeploymentBreadcrumb;
