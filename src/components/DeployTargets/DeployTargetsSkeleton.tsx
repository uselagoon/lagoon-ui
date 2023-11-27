import React from "react";
import Skeleton from "react-loading-skeleton";
import { DeployTargetWrapper } from "./StyledDeployTargets";

const DeployTargetSkeleton = () => {
  const numberOfDeployTargetFields = 4

  const skeletonItem = (
    <div className="data-row">
      <div className="dt-name">
        <Skeleton width={"50%"} />
      </div>
      <div className="dt-branch">
        <Skeleton width={"50%"} />
      </div>
      <div className="dt-pr">
        <Skeleton width={"50%"} />
      </div>
    </div>
  );

  return (
    <DeployTargetWrapper>
      <div className="header">
        <label className="dt-name">Deploy Target Name</label>
        <label className="dt-branch">Branches enabled</label>
        <label className="dt-pr">Pull requests enabled</label>
      </div>
      <div className="data-table">
        {[...Array<undefined>(numberOfDeployTargetFields)].map(
          () => skeletonItem
        )}
      </div>
    </DeployTargetWrapper>
  );
};

export default DeployTargetSkeleton;
