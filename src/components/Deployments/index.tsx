import React, { FC } from 'react';

import CancelDeployment from 'components/CancelDeployment';
import { getDeploymentDuration } from 'components/Deployment';
import HoverTag from 'components/HoverTag';
import BulkDeploymentLink from 'components/link/BulkDeployment';
import DeploymentLink from 'components/link/Deployment';
import moment from 'moment';

import { StyledDeployments } from './StyledDeployments';

interface DeploymentsProps {
  deployments: {
    id: string;
    name: string;
    bulkId: string;
    status: string;
    created: string;
    buildStep?: string;
  }[];
  environmentSlug: string;
  projectSlug: string;
}
/**
 * Displays a list of deployments.
 */
const Deployments: FC<DeploymentsProps> = ({ deployments, environmentSlug, projectSlug }) => (
  <StyledDeployments>
    <div className="header">
      <label>Name</label>
      <label>Created</label>
      <label>Status</label>
      <label>Duration</label>
    </div>
    <div className="data-table">
      {!deployments.length && <div className="data-none">No Deployments</div>}
      {deployments.map(deployment => (
        <div className="deploymentRow" key={deployment.id}>
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
                    <BulkDeploymentLink bulkIdSlug={deployment.bulkId}>bulk</BulkDeploymentLink>
                  </label>
                )}
              </div>
              <div className="started">
                {moment.utc(deployment.created).local().format('DD MMM YYYY, HH:mm:ss (Z)')}
              </div>
              <div className={`status ${deployment.status}`}>
                {deployment.status.charAt(0).toUpperCase() + deployment.status.slice(1)}

                {!['complete', 'cancelled', 'failed'].includes(deployment.status) && deployment.buildStep && (
                  <HoverTag text={deployment.buildStep} maxWidth="180px" tooltipPosition="top" />
                )}
              </div>
              <div className="duration">{getDeploymentDuration(deployment)} </div>
            </div>
          </DeploymentLink>

          <div className="cancel-button">
            {['new', 'pending', 'queued', 'running'].includes(deployment.status) && (
              <CancelDeployment deployment={deployment} afterText="Cancelled" beforeText="Cancel" />
            )}
          </div>
        </div>
      ))}
    </div>
  </StyledDeployments>
);

export default Deployments;
