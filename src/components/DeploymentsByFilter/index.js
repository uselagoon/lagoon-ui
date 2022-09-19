import React, { useState } from 'react';
import Link from 'next/link';
import css from 'styled-jsx/css';
import Highlighter from 'react-highlight-words';
import ProjectLink from 'components/link/Project';
import Box from 'components/Box';
import { bp, color, fontSize } from 'lib/variables';
import DeploymentsLink from 'components/link/Deployments';
import DeploymentLink from 'components/link/Deployment';
import moment from 'moment';
import { getDeploymentDuration } from 'components/Deployment';
import CancelDeployment from 'components/CancelDeployment';

const { className: boxClassName, styles: boxStyles } = css.resolve`
  .box {
    margin-bottom: 7px;

    .content {
      padding: 9px 20px 14px;
      @media ${bp.tinyUp} {
        display: flex;
      }
    }
  }
`;

/**
 * The primary list of running deployments.
 */
const DeploymentsByFilter = (input) => {
  const { deployments, data } = input;
  // console.log(data)
  
  //Do we actually need this?
  const filteredDeployments = deployments.filter(key => { return true; });

  return (
    <>
      <div className="header">
        <label>{filteredDeployments.length <= 1 ? `${filteredDeployments.length} Deployments` : `${filteredDeployments.length} Deployments`}</label>
        <label></label>
      </div>
      {!deployments.length && (
        <Box>
          <div className="deployment">
            <h4>No deployments</h4>
          </div>
        </Box>
      )}
    <div className="tasks">
    <div className="header">
    <label>Project</label>
      <label>Environment</label>
      <label>Cluster</label>
      <label>Name</label>
      <label className="priority">Priority</label>
      <label>Created</label>
      <label>Status</label>
      <label>Duration</label>
      <label></label>
    </div>
    <div className="data-table">
      {filteredDeployments.map(deployment => (
        <div className="data-row">
            <div className="project">
              <ProjectLink
                projectSlug={deployment.environment.project.name}
              >{deployment.environment.project.name}
              </ProjectLink>
            </div>
            <div className="environment">
              <DeploymentsLink
                environmentSlug={deployment.environment.openshiftProjectName}
                projectSlug={deployment.environment.project.name}
              >{deployment.environment.name}
              </DeploymentsLink>
            </div>
            <div className="cluster">
              {deployment.environment.openshift.name}
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
            <div className="started">
              {moment
                .utc(deployment.created)
                .local()
                .format('DD MMM YYYY, HH:mm:ss (Z)')}
            </div>
            <div className={`status ${deployment.status}`}>
              {deployment.status.charAt(0).toUpperCase() +
                deployment.status.slice(1)}
            </div>
            <div className="duration">{getDeploymentDuration(deployment)}</div>
            <div>
              {['new', 'pending', 'running'].includes(deployment.status) && (
                <CancelDeployment deployment={deployment} afterText="cancelled" beforeText="cancel" />
              )}
            </div>
        </div>
      ))}
      </div>
      </div>
      <style jsx>{`
        .header {
          @media ${bp.tinyUp} {
            align-items: center;
            display: flex;
            justify-content: flex-end;
            margin: 0 0 14px;
          }
          @media ${bp.smallOnly} {
            flex-wrap: wrap;
          }
          @media ${bp.tabletUp} {
            margin-top: 40px;
          }
          label {
            display: none;
            padding-left: 20px;
            width: 50%;
            @media ${bp.tinyUp} {
              display: block;
            }
            &:nth-child(2) {
              @media ${bp.tabletUp} {
                width: 20%;
              }
            }
          }
        }
        .deployment {
          font-weight: normal;

          @media ${bp.tinyUp} {
            width: 50%;
          }
        }
        .data-table {
          background-color: ${color.white};
          border: 1px solid ${color.lightestGrey};
          border-radius: 3px;
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  
          .data-none {
            border: 1px solid ${color.white};
            border-bottom: 1px solid ${color.lightestGrey};
            border-radius: 3px;
            line-height: 1.5rem;
            padding: 8px 0 7px 0;
            text-align: center;
          }
  
          .data-row {
            background-image: url('/static/images/right-arrow.svg');
            background-position: right 20px center;
            background-repeat: no-repeat;
            background-size: 18px 11px;
            border: 1px solid ${color.white};
            border-bottom: 1px solid ${color.lightestGrey};
            border-radius: 0;
            line-height: 1.5rem;
            padding: 8px 0 7px 0;
            @media ${bp.tinyUp} {
              display: flex;
              justify-content: space-between;
              padding-right: 40px;
            }
  
            & > div {
              padding-left: 20px;
              @media ${bp.tinyUp} {
                width: 20%;
              }
              @media ${bp.xs_smallUp} {
                width: 24%;
                &.service,
                &.status {
                  width: 14%;
                }
              }
            }
  
            &:hover {
              border: 1px solid ${color.brightBlue};
            }
  
            &:first-child {
              border-top-left-radius: 3px;
              border-top-right-radius: 3px;
            }
  
            &:last-child {
              border-bottom-left-radius: 3px;
              border-bottom-right-radius: 3px;
            }
  
            .status {
              @media ${bp.tinyOnly} {
                margin-left: 20px;
              }
              @media ${bp.tiny_wide} {
                background-position: center;
              }
              background-position: left 7px;
              background-repeat: no-repeat;
              background-size: 10px 10px;
  
              &.active {
                background-image: url('/static/images/in-progress.svg');
              }
  
              &.new {
                background-image: url('/static/images/in-progress.svg');
              }
  
              &.pending {
                background-image: url('/static/images/in-progress.svg');
              }
  
              &.running {
                background-image: url('/static/images/in-progress.svg');
              }
  
              &.failed {
                background-image: url('/static/images/failed.svg');
              }
  
              &.cancelled {
                background-image: url('/static/images/failed.svg');
              }
  
              &.succeeded {
                background-image: url('/static/images/successful.svg');
              }
  
              &.complete {
                background-image: url('/static/images/successful.svg');
              }
  
              span {
                @media ${bp.tiny_wide} {
                  display: none;
                }
              }
            }
          }
        }
      `}</style>
      {boxStyles}
    </>
  );
};

export default DeploymentsByFilter;
