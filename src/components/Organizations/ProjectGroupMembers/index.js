import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import RemoveProjectGroupConfirm from 'components/Organizations/RemoveProjectGroupConfirm';
import OrgGroupsLink from 'components/link/Organizations/Group';
import gql from 'graphql-tag';

import AddGroupToProject from '../AddGroupToProject';
import { StyledGroupMembers } from './Styles';

const REMOVE_GROUP_FROM_PROJECT = gql`
  mutation removeGroupFromProject($groupName: String!, $projectName: String!) {
    removeGroupsFromProject(input: { groups: [{ name: $groupName }], project: { name: $projectName } }) {
      name
    }
  }
`;

/**
 * The primary list of members.
 */
const ProjectGroupMembers = ({ groups = [], organizationId, organizationName, projectName, orgGroups, refresh }) => {
  const [searchInput, setSearchInput] = useState('');

  const filteredMembers = groups.filter(key => {
    const sortByName = key.name.toLowerCase().includes(searchInput.toLowerCase());
    return ['name', 'role', '__typename'].includes(key) ? false : true && sortByName;
  });

  return (
    <StyledGroupMembers>
      <div className="header" style={{ marginTop: '20px', paddingRight: '0' }}>
        <label style={{ paddingLeft: '0' }}>Groups ({groups.length})</label>
        <input
          aria-labelledby="search"
          className="searchInput"
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Type to search"
          disabled={groups.length === 0}
        />
      </div>

      <div className="data-table">
        {!groups.length && <div className="data-none">No groups</div>}
        {searchInput && !filteredMembers.length && <div className="data-none">No groups matching "{searchInput}"</div>}
        {filteredMembers.map(group => (
          <div className="data-row" key={group.id}>
            <div className="name">
              <OrgGroupsLink
                groupSlug={group.name}
                organizationSlug={organizationId}
                organizationName={organizationName}
              >
                {group.name}
              </OrgGroupsLink>
            </div>
            <div className="members">Members: {group.memberCount}</div>

            <div className="labels">
              {group.type.includes('project-default-group') && (
                <label className="default-group-label">SYSTEM GROUP</label>
              )}
            </div>

            {/* even though we can't prevent users from removing the project default group from the api, we can make it harder to do from the ui */}
            {(!group.name.includes('project-' + projectName.toLowerCase()) && (
              <div className="remove">
                <Mutation mutation={REMOVE_GROUP_FROM_PROJECT}>
                  {(removeGroupFromProject, { _, called, error }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    return (
                      <RemoveProjectGroupConfirm
                        loading={called}
                        info={{
                          type: 'group',
                          deleteName: group.name,
                          projectName: projectName,
                        }}
                        onRemove={() => {
                          removeGroupFromProject({
                            variables: {
                              groupName: group.name,
                              projectName: projectName,
                            },
                          }).then(refresh);
                        }}
                      />
                    );
                  }}
                </Mutation>
              </div>
            )) || <div className="remove"></div>}
          </div>
        ))}
      </div>
      <AddGroupToProject
        projectName={projectName}
        organizationId={organizationId}
        options={orgGroups.map(group => {
          return { label: group.name, value: group.name };
        })}
        refresh={refresh}
      />
    </StyledGroupMembers>
  );
};

export default ProjectGroupMembers;
