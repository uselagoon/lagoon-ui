import React from 'react';

import { StyledOrganization } from './Styles';

/**
 * Displays the organization information.
 */
const Organization = ({ organization }) => {
  // this is done on the API side when creating groups against the organization as project-default-groups are not counted towards the quota
  // using the same count here to show the quota in the ui
  let groupCount = 0;
  for (const pGroup in organization.groups) {
    // project-default-groups don't count towards group quotas
    if (organization.groups[pGroup].type != 'project-default-group') {
      groupCount++;
    }
  }

  return (
    <StyledOrganization>
      <div className="field-wrapper quotaProject">
        <div>
          <label>Project Quota</label>
          <div className="field">
            {organization.projects.length}/{organization.quotaProject}
          </div>
        </div>
        <div>
          <label>Group Quota</label>
          <div className="field">
            {groupCount}/{organization.quotaGroup}
          </div>
        </div>
        <div>
          <label>Notification Quota</label>
          <div className="field">
            {organization.slacks.length +
              organization.rocketchats.length +
              organization.teams.length +
              organization.emails.length +
              organization.webhook.length}
            /{organization.quotaNotification}
          </div>
        </div>
      </div>
      <div className="field-wrapper owners">
        <div>
          <label>Users</label>
          <div className="field">
            {organization.owners.map(owner => (
              <li key={owner.email}>
                {owner.email}
                {owner.owner ? (
                  <label className="owner-label">OWNER</label>
                ) : (
                  <label className="viewer-label">VIEWER</label>
                )}
              </li>
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
    </StyledOrganization>
  );
};

export default Organization;
