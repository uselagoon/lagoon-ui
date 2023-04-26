import useTranslation from "lib/useTranslation";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { StyledDeployments } from "./StyledDeployments";

const DeploymentsSkeleton = () => {
  const t = useTranslation();

  const numberOfDeploymentFields =
    typeof window !== "undefined"
      ? Math.floor((window.innerHeight * 8) / 10 / 65)
      : 10;

  const skeletonItem = (
    <div className="data-row">
      <div className="name">
        <Skeleton />
      </div>
      <div className="started">
        <Skeleton />
      </div>
      <div className="status">
        <Skeleton width={"50%"} />
      </div>
      <div className="duration">
        <Skeleton width={"50%"} />
      </div>
    </div>
  );

  return (
    <StyledDeployments>
      <div className="header">
        <label>{t("deployments.label.name")}</label>
        <label>{t("deployments.label.created")}</label>
        <label>{t("deployments.label.status")}</label>
        <label>{t("deployments.label.duration")}</label>
      </div>
      <div className="data-table">
        {[...Array<undefined>(numberOfDeploymentFields)].map(
          () => skeletonItem
        )}
      </div>
    </StyledDeployments>
  );
};

export default DeploymentsSkeleton;
