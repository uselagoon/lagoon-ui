import React, { FC } from "react";
import { getLinkData } from "components/link/BulkDeployment";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import useTranslation from "lib/useTranslation";

const BulkDeploymentBreadcrumb: FC<{ title: string; bulkIdSlug: string }> = ({
  title,
  bulkIdSlug,
}) => {
  const t = useTranslation();
  const linkData = getLinkData(bulkIdSlug);

  return <Breadcrumb header={t("breadcrumbs.bulkDeployment")} title={title} {...linkData} />;
};

export default BulkDeploymentBreadcrumb;
