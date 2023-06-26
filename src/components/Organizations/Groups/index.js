import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import DeleteConfirm from 'components/DeleteConfirm';
import withLogic from 'components/Organizations/Groups/logic';
import OrgGroupsLink from 'components/link/Organizations/Group';
import gql from 'graphql-tag';

import { StyledGroups } from './Styles';

const DELETE_GROUP = gql`
  mutation deleteGroup($groupName: String!) {
    deleteGroup(input: { group: { name: $groupName } })
  }
`;

/**
 * The primary list of groups.
 */
const Groups = ({ groups = [], organizationId, organizationName, onGroupDeleted, closeModal }) => {
  const [searchInput, setSearchInput] = useState('');

  const filteredGroups = groups.filter(key => {
    const sortByName = key.name.toLowerCase().includes(searchInput.toLowerCase());
    let sortByUrl = '';
    return ['name', 'environments', '__typename'].includes(key) ? false : (true && sortByName) || sortByUrl;
  });

  return (
    <StyledGroups>
      <div className="header">
        <label>Groups</label>
        <label></label>
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
        {searchInput && !filteredGroups.length && <div className="data-none">No groups matching "{searchInput}"</div>}
        {filteredGroups.map(group => (
          <div key={group.name} className="data-row" group={group.name}>
            <div className="group">
              <OrgGroupsLink
                groupSlug={group.name}
                organizationSlug={organizationId}
                organizationName={organizationName}
                key={group.id}
              >
                {group.name}
              </OrgGroupsLink>
            </div>
            <div className="customer">
              {group.type.includes('project-default-group') && (
                <label className="default-group-label">{group.type}</label>
              )}
            </div>
            <div className="customer">Members: {group.members.length}</div>
            {/* <div className="customer">
            Projects: {group.projects.length}
          </div> */}
            {(!group.type.includes('project-default-group') && (
              <div className="remove">
                <Mutation mutation={DELETE_GROUP}>
                  {(deleteGroup, { loading, called, error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      onGroupDeleted().then(closeModal);
                    }
                    return (
                      <DeleteConfirm
                        deleteName={group.name}
                        deleteType="group"
                        onDelete={() => {
                          deleteGroup({
                            variables: {
                              groupName: group.name,
                            },
                          });
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
    </StyledGroups>
  );
};

export default withLogic(Groups);
