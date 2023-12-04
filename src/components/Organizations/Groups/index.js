import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';
import OrgGroupsLink from 'components/link/Organizations/Group';
import gql from 'graphql-tag';

import AddUserToGroup from '../AddUserToGroup';
import NewGroup from '../NewGroup';
import PaginatedTable from '../PaginatedTable/PaginatedTable';
import { Footer, RemoveModalHeader, RemoveModalParagraph, TableActions, Tag } from '../SharedStyles';
import { GroupsWrapper, StyledGroups } from './Styles';

const DELETE_GROUP = gql`
  mutation deleteGroup($groupName: String!) {
    deleteGroup(input: { group: { name: $groupName } })
  }
`;

/**
 * The primary list of groups.
 */
const Groups = ({ groups = [], organizationId, organizationName, ableToAddGroup, refetch }) => {
  const [modalStates, setModalStates] = useState({
    addUser: {
      open: false,
      current: null,
    },
    deleteGroup: {
      open: false,
      current: null,
    },
  });

  const modalAction = (type, modal, current) => {
    const closedState = {
      open: false,
      current: null,
    };

    if (type === 'open') {
      setModalStates({
        ...modalStates,
        [modal]: {
          open: true,
          current,
        },
      });
    } else {
      setModalStates({
        ...modalStates,
        [modal]: closedState,
      });
    }
  };

  const Columns = [
    {
      width: '50%',
      key: 'name',
      render: i => {
        return (
          <OrgGroupsLink
            groupSlug={i.name}
            organizationSlug={organizationName}
            organizationId={organizationId}
            key={i.id}
          >
            <span>
              {i.name}{' '}
              {i.type === 'project-default-group' && (
                <Tag style={{ display: 'inline' }} background="#262D65">
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
      render: i => {
        return typeof i.memberCount !== 'undefined' && <span>Members: {i.memberCount} </span>;
      },
    },
    {
      width: '35%',
      key: 'actions',
      render: function (i) {
        return (
          <TableActions>
            <>
              <Tooltip overlayClassName="orgTooltip" title="Add a user to the group" placement="bottom">
                <UserAddOutlined className="add" onClick={() => modalAction('open', 'addUser', i)} />
              </Tooltip>
              <Modal
                style={{
                  content: {
                    width: '50%',
                  },
                }}
                isOpen={modalStates.addUser.open && modalStates.addUser.current.name === i.name}
                onRequestClose={() => modalAction('close', 'addUser')}
              >
                <AddUserToGroup
                  group={i}
                  organizationId={organizationId}
                  onAddUser={refetch}
                  close={() => modalAction('close', 'addUser')}
                />
              </Modal>
            </>
            <Tooltip overlayClassName="orgTooltip" title="Edit" placement="bottom">
              <>
                <OrgGroupsLink
                  className="link"
                  groupSlug={i.name}
                  organizationSlug={organizationName}
                  organizationId={organizationId}
                  key={i.id}
                >
                  <EditOutlined className="edit" />
                </OrgGroupsLink>
              </>
            </Tooltip>

            {i.type !== 'project-default-group' && (
              <>
                <Tooltip overlayClassName="orgTooltip" title="Delete" placement="bottom">
                  <DeleteOutlined className="delete" onClick={() => modalAction('open', 'deleteGroup', i)} />
                </Tooltip>

                <Modal
                  isOpen={modalStates.deleteGroup.open && modalStates.deleteGroup.current.name === i.name}
                  onRequestClose={() => modalAction('close', 'deleteGroup')}
                >
                  <RemoveModalHeader>Are you sure?</RemoveModalHeader>
                  <RemoveModalParagraph>
                    This action will delete group <span>{i.name}</span> from this organization.
                  </RemoveModalParagraph>

                  <Footer>
                    <Mutation mutation={DELETE_GROUP}>
                      {(deleteGroup, { called, error, data }) => {
                        if (error) {
                          return <div className="error">{error.message}</div>;
                        }
                        if (data) {
                          refetch().then(() => modalAction('close', 'deleteGroup'));
                        }

                        return (
                          <Button
                            variant="primary"
                            loading={called}
                            disabled={called}
                            action={() => {
                              deleteGroup({
                                variables: {
                                  groupName: modalStates.deleteGroup?.current?.name,
                                },
                              });
                            }}
                          >
                            Continue
                          </Button>
                        );
                      }}
                    </Mutation>
                    <Button variant="ghost" action={() => modalAction('close', 'deleteGroup')}>
                      Cancel
                    </Button>
                  </Footer>
                </Modal>
              </>
            )}
          </TableActions>
        );
      },
    },
  ];

  return (
    <GroupsWrapper>
      <StyledGroups>
        <PaginatedTable
          limit={10}
          data={groups}
          columns={Columns}
          withSorter
          defaultViewOptions={{
            selected: false,
            type: 'group',
          }}
          numericSortOptions={{ key: 'memberCount', displayName: 'Members' }}
          emptyText="No groups found"
          labelText="Groups"
        />
        <NewGroup
          disabled={!ableToAddGroup}
          organizationId={organizationId}
          onGroupAdded={refetch}
          existingGroupNames={groups.map(g => g.name)}
        />
      </StyledGroups>
    </GroupsWrapper>
  );
};

export default Groups;
