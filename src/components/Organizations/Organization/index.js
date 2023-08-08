import React from 'react';

import Link from 'next/link';

import { EnvironmentOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';

import OrgHeader from '../Orgheader';
import { LinkBtn, StyledOrganization, StyledOverview } from './Styles';

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

  const quotaDisplay = (quota, quotaNumber) => {
    const pluralName = quota + 's';
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

    const link = {
      urlObject: {
        pathname: `/organizations/${pluralName}`,
        query: { organizationSlug: organization.id },
      },
      asPath: `/organizations/${organization.id}/${pluralName}`,
    };

    return (
      <div className="quotaField">
        <span>{pluralName.toUpperCase()}</span>
        <span className="quota">
          {capitalize(quota)} quota: {quotaNumber} of 10
        </span>

        <Link href={link.urlObject} as={link.asPath}>
          <LinkBtn>
            <EyeOutlined className="icon" /> {capitalize(pluralName)}
          </LinkBtn>
        </Link>
      </div>
    );
  };

  return (
    <StyledOrganization>
      <OrgHeader headerText="overview" />

      <StyledOverview>
        <span className="orgname">{organization.name}</span>

        <div className="description">
          <span className="title">Description</span>
          <p>{organization.description}</p>
        </div>
        <div className="info">
          <div className="quotas">
            {quotaDisplay('group', groupCount)}
            {quotaDisplay('project', organization.projects.length)}
            {quotaDisplay(
              'notification',
              organization.slacks.length +
                organization.rocketchats.length +
                organization.teams.length +
                organization.emails.length +
                organization.webhook.length
            )}
          </div>

          <div className="targetwrapper">
            <div className="targets">
              <span>Available Deployments</span>
              {organization.deployTargets.map(deploytarget => (
                <div key={deploytarget.id} className="target">
                  <EnvironmentOutlined className="targetIcon" />
                  {deploytarget.name}
                </div>
              ))}
            </div>

            <div className="users">
              <span>Users</span>
              {organization.owners.map(owner => (
                <div key={owner.email} className="user">
                  <UserOutlined className="userIcon" />
                  {owner.email}
                </div>
              ))}
            </div>
          </div>
        </div>
      </StyledOverview>
    </StyledOrganization>
  );
};

export default Organization;
