import React, { FC } from "react";
import { getLinkData } from "components/link/Deployment";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import useTranslation from "lib/useTranslation";

interface DeploymentBreadcrumbProps {
  deploymentSlug: string;
  environmentSlug: string;
  projectSlug: string;
}

const DeploymentBreadcrumb: FC<DeploymentBreadcrumbProps> = ({
  deploymentSlug,
  environmentSlug,
  projectSlug,
}) => {
  const t = useTranslation();
  const linkData = getLinkData(deploymentSlug, environmentSlug, projectSlug);

  return (
    <Breadcrumb header={t("breadcrumbs.deployment")} title={deploymentSlug} {...linkData} />
  );
};

export default DeploymentBreadcrumb;
