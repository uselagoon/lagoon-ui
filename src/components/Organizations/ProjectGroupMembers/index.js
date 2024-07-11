import React from 'react';
import { Mutation } from 'react-apollo';

import { EyeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import RemoveProjectGroupConfirm from 'components/Organizations/RemoveProjectGroupConfirm';
import OrgGroupsLink from 'components/link/Organizations/Group';
import gql from 'graphql-tag';

import AddGroupToProject from '../AddGroupToProject';
import PaginatedTable from '../PaginatedTable/PaginatedTable';
import { TableActions, Tag } from '../SharedStyles';
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
const ProjectGroupMembers = ({
  groups = [],
  organizationId,
  organizationSlug,
  projectName,
  orgGroups,
  refresh,
  orgFriendlyName,
}) => {
  const Columns = [
    {
      width: '50%',
      key: 'name',
      render: g => {
        return (
          <OrgGroupsLink
            groupSlug={g.name}
            organizationSlug={organizationSlug}
            organizationId={organizationId}
            orgFriendlyName={orgFriendlyName}
            key={g.id}
          >
            <span>
              {g.name}{' '}
              {g.type === 'project-default-group' && (
                <Tag style={{ display: 'inline' }} className="default-group-label" $background="#262D65">
                  SYSTEM GROUP
                </Tag>
              )}
            </span>
          </OrgGroupsLink>
        );
      },
    },

    {
      width: '15%',
      key: 'members',
      render: g => {
        return typeof g.memberCount !== 'undefined' && <span data-cy="memberCount">Members: {g.memberCount} </span>;
      },
    },
    {
      width: '35%',
      key: 'actions',
      render: function (g) {
        return (
          <TableActions>
            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="View group">
              <div className="link">
                <>
                  <OrgGroupsLink
                    orgFriendlyName={orgFriendlyName}
                    groupSlug={g.name}
                    organizationSlug={organizationSlug}
                    organizationId={organizationId}
                  >
                    <EyeOutlined />
                  </OrgGroupsLink>
                </>
              </div>
            </Tooltip>

            {g.type !== 'project-default-group' && (
              <>
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
                            deleteName: g.name,
                            projectName: projectName,
                          }}
                          onRemove={() => {
                            removeGroupFromProject({
                              variables: {
                                groupName: g.name,
                                projectName: projectName,
                              },
                            }).then(refresh);
                          }}
                        />
                      );
                    }}
                  </Mutation>
                </div>
              </>
            )}
          </TableActions>
        );
      },
    },
  ];

  return (
    <StyledGroupMembers>
      <div className="project-wrapper">
        <PaginatedTable
          limit={10}
          data={groups}
          columns={Columns}
          defaultViewOptions={{
            selected: false,
            selectedOnZeroCount: true,
            type: 'group',
          }}
          emptyText="No groups found"
          labelText="Groups"
        />
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
