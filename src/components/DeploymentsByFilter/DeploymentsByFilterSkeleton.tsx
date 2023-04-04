import React from "react";
import Skeleton from "react-loading-skeleton";
import ThemedSkeletonWrapper from "../../styles/ThemedSkeletonWrapper";
import {
  Deployments,
  DeploymentsDataTable,
  DeploymentsHeader,
} from "./StyledDeploymentsByFilter";

const DeploymentsByFilterSkeleton = () => {
  const SkeletonRow = (
    <div className="data-row row-heading skeleton">
      <div className="project">
        <Skeleton />
      </div>
      <div className="environment">
        <Skeleton />
      </div>

      <div className="cluster">
        <Skeleton />
      </div>
      <div className="name">
        <Skeleton />
      </div>
      <div className="priority">
        <Skeleton />
      </div>
      <div className="started">
        <Skeleton />
      </div>
      <div className="status">
        <Skeleton width={"50%"} />
      </div>
      <div className="duration">
        <Skeleton />
      </div>
      <div>
        <Skeleton width={"80%"} />
      </div>
    </div>
  );

  // fit skeleton items on 80vh
  const numberOfItems =
    typeof window !== "undefined"
      ? Math.floor((window.innerHeight * 8) / 10 / 80)
      : 10;

  return (
    <Deployments>
      <ThemedSkeletonWrapper>
        <div className="filters">
          <label>
            <Skeleton width={"20%"} />
          </label>
          <label></label>
          <input type="text" id="filter" placeholder="Filter deployments..." />
        </div>
        <DeploymentsHeader>
          <label>Project</label>
          <label>Environment</label>
          <label>Cluster</label>
          <button type="button" className="button-sort name">
            Name
          </button>
          <label className="priority">Priority</label>
          <button type="button" className="button-sort created">
            Created
          </button>
          <button type="button" className="button-sort status">
            Status
          </button>
          <label>Duration</label>
          <label></label>
        </DeploymentsHeader>
        <DeploymentsDataTable>
          {[...Array<undefined>(numberOfItems)].map(() => SkeletonRow)}
        </DeploymentsDataTable>
      </ThemedSkeletonWrapper>
    </Deployments>
  );
};

export default DeploymentsByFilterSkeleton;
