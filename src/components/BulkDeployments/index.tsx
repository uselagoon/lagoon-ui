import React, { FC } from 'react';

import CancelDeployment from 'components/CancelDeployment';
import { formatString } from 'components/DeploymentsByFilter';
import HoverTag from 'components/HoverTag';
import DeploymentLink from 'components/link/Deployment';
import DeploymentsLink from 'components/link/Deployments';
import ProjectLink from 'components/link/Project';
import { getProcessDuration } from 'lib/util';
import moment from 'moment';

import { BulkDeploymentsDataTable, BulkDeploymentsHeader } from './StyledBulkDeployments';

/**
 * Displays a list of deployments.
 */
interface BulkDeploymentsProps {
  deployments: {
    id: string;
    name: string;
    priority: string;
    status: string;
    created: string;
    buildStep: string;
    environment: {
      openshiftProjectName: string;
      name: string;
      project: {
        name: string;
      };
    };
  }[];
}

const BulkDeployments: FC<BulkDeploymentsProps> = ({ deployments }) => (
  <div className="deployments">
    <BulkDeploymentsHeader>
      <label>Project</label>
      <label>Environment</label>
      <label className="name">Name</label>
      <label className="priority">Priority</label>
      <label className="created">Created</label>
      <label className="status">Status</label>
      <label className="duration">Duration</label>
      <label></label>
    </BulkDeploymentsHeader>
    <BulkDeploymentsDataTable>
      {!deployments.length && <div className="data-none">No Deployments</div>}
      {deployments.map((deployment, idx) => (
        <div className="data-row" key={idx} data-deployment={deployment.id}>
          <div className="project">
            <ProjectLink projectSlug={deployment.environment.project.name}>
              {formatString(deployment.environment.project.name, 'project')}
            </ProjectLink>
          </div>
          <div className="environment">
            <DeploymentsLink
              environmentSlug={deployment.environment.openshiftProjectName}
              projectSlug={deployment.environment.project.name}
            >
              {formatString(deployment.environment.name, 'environment')}
            </DeploymentsLink>
          </div>
          <div className="name">
            <DeploymentLink
              deploymentSlug={deployment.name}
              environmentSlug={deployment.environment.openshiftProjectName}
              projectSlug={deployment.environment.project.name}
              key={deployment.id}
            >
              {deployment.name}
            </DeploymentLink>
          </div>
          <div className="priority">{deployment.priority}</div>
          <div className="started">{moment.utc(deployment.created).local().format('DD MMM YYYY, HH:mm:ss (Z)')}</div>
          <div className={`status buildstep ${deployment.status}`}>
            <span>{deployment.status.charAt(0).toUpperCase() + deployment.status.slice(1)} </span>
            {!['complete', 'cancelled', 'failed'].includes(deployment.status) && deployment.buildStep && (
              <HoverTag text={deployment.buildStep} maxWidth="160px" />
            )}
          </div>
          <div className="duration">{getProcessDuration(deployment)}</div>
          <div>
            {['new', 'pending', 'queued', 'running'].includes(deployment.status) && (
              <CancelDeployment deployment={deployment} afterText="Cancelled" beforeText="Cancel" />
            )}
          </div>
        </div>
      ))}
    </BulkDeploymentsDataTable>
  </div>
);

export default BulkDeployments;
