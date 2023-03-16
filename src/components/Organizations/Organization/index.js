import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { Mutation } from 'react-apollo';
import { bp, color } from 'lib/variables';
import Router from 'next/router';
import Box from 'components/Box';

/**
 * Displays the organization information.
 */
const Organization = ({ organization }) => {
  let groupCount = 0
  for (const pGroup in organization.groups) {
    // project-default-groups don't count towards group quotas
    if (organization.groups[pGroup].type != "project-default-group") {
      groupCount++
    }
  }

  return (
    <div className="details">
      <div className="field-wrapper quotaProject">
        <div>
          <label>Project Quota</label>
          <div className="field">{organization.projects.length}/{organization.quotaProject}</div>
        </div>
        <div>
          <label>Group Quota</label>
          <div className="field">{groupCount}/{organization.quotaGroup}</div>
        </div>
        <div>
          <label>Notification Quota</label>
          <div className="field">{organization.slacks.length + organization.rocketchats.length + organization.teams.length + organization.emails.length + organization.webhook.length}/{organization.quotaNotification}</div>
        </div>
      </div>
      <div className="field-wrapper owners">
        <div>
          <label>Users</label>
          <div className="field">
            {organization.owners.map(owner => (
              <li key={owner.email}>{owner.email}{owner.owner ? ( <label className="owner-label">OWNER</label>) : ( <label className="viewer-label">VIEWER</label>)}</li>
            ))}
          </div>
        </div>
      </div>
      <div className="field-wrapper targets">
        <div>
          <label>Available DeployTargets</label>
          <div className="field">
            {organization.deployTargets.map(deploytarget => (
              <li key={deploytarget.id}>{deploytarget.name}</li>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .details {
          padding: 32px calc((100vw / 16) * 1);
          width: 100%;
          @media ${bp.xs_smallUp} {
            display: flex;
            flex-wrap: wrap;
            min-width: 100%;
            padding-left: calc(((100vw / 16) * 1.5) + 28px);
            padding-top: 48px;
            width: 100%;
          }
          @media ${bp.tabletUp} {
            padding: 48px calc((100vw / 16) * 1) 48px
              calc(((100vw / 16) * 1.5) + 28px);
          }
          @media ${bp.extraWideUp} {
            padding-left: calc(((100vw / 16) * 1) + 28px);
          }
          .owner-label {
            color: ${color.white};
            background-color: ${color.blue};
            margin-left: 10px;
            padding: 0px 5px 0px 5px;
            border-radius: 4px;
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
          }
          .viewer-label {
            color: ${color.black};
            background-color: ${color.lightestBlue};
            margin-left: 10px;
            padding: 0px 5px 0px 5px;
            border-radius: 4px;
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
          }
          .field-wrapper {
            &::before {
              left: calc(((-100vw / 16) * 1.5) - 28px);
            }
            @media ${bp.xs_smallUp} {
              min-width: 50%;
              position: relative;
              width: 50%;
            }
            @media ${bp.wideUp} {
              min-width: 33.33%;
              width: 33.33%;
            }
            @media ${bp.extraWideUp} {
              min-width: 25%;
              width: 25%;
            }
            &.quotaProject {
              width: 100%;
              &::before {
                background-image: url('/static/images/tasks-dark.svg');
                background-size: 15px 20px;
              }
            }
            &.targets {
              width: 50%;
              &::before {
                background-image: url('/static/images/target.svg');
                background-size: 19px 19px;
              }
            }
            &.owners {
              width: 50%;
              &::before {
                background-image: url('/static/images/members.svg');
                background-size: 19px 19px;
              }
            }
            & > div {
              width: 100%;
            }
            .field {
              padding-right: calc((100vw / 16) * 1);
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Organization;
