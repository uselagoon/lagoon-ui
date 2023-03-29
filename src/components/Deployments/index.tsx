import React, { FC } from "react";
import moment from "moment";
import DeploymentLink from "components/link/Deployment";
import BulkDeploymentLink from "components/link/BulkDeployment";
import { getDeploymentDuration } from "components/Deployment";
import { StyledDeployments } from "./StyledDeployments";

interface DeploymentsProps {
  deployments: {
    id: string;
    name: string;
    bulkId: string;
    status: string;
    created: string;
  }[];
  environmentSlug: string;
  projectSlug: string;
}
/**
 * Displays a list of deployments.
 */
const Deployments: FC<DeploymentsProps> = ({
  deployments,
  environmentSlug,
  projectSlug,
}) => (
  <StyledDeployments>
    <div className="header">
      <label>Name</label>
      <label>Created</label>
      <label>Status</label>
      <label>Duration</label>
    </div>
    <div className="data-table">
      {!deployments.length && <div className="data-none">No Deployments</div>}
      {deployments.map((deployment) => (
        <DeploymentLink
          deploymentSlug={deployment.name}
          environmentSlug={environmentSlug}
          projectSlug={projectSlug}
          key={deployment.id}
        >
          <div className="data-row" data-deployment={deployment.id}>
            <div className="name">
              {deployment.name}
              {deployment.bulkId && (
                <label className="bulk-label">
                  <BulkDeploymentLink bulkIdSlug={deployment.bulkId}>
                    bulk
                  </BulkDeploymentLink>
                </label>
              )}
            </div>
            <div className="started">
              {moment
                .utc(deployment.created)
                .local()
                .format("DD MMM YYYY, HH:mm:ss (Z)")}
            </div>
            <div className={`status ${deployment.status}`}>
              {deployment.status.charAt(0).toUpperCase() +
                deployment.status.slice(1)}
            </div>
            <div className="duration">{getDeploymentDuration(deployment)}</div>
          </div>
        </DeploymentLink>
      ))}
    </div>
  </StyledDeployments>
);

export default Deployments;
