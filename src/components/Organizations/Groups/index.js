import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import OrgGroupsLink from 'components/link/Organizations/Group';
import gql from 'graphql-tag';

import AddUserToGroup from '../AddUserToGroup';
import NewGroup from '../NewGroup';
import PaginatedTable from '../PaginatedTable/PaginatedTable';
import { Footer, RemoveModalHeader, RemoveModalParagraph, TableActions, Tag } from '../SharedStyles';
import { DeleteButton, GroupsWrapper, StyledGroups } from './Styles';

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
            organizationSlug={organizationId}
            organizationName={organizationName}
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
        return typeof i.memberCount !== 'undefined' && <span data-cy="memberCount">Members: {i.memberCount} </span>;
      },
    },
    {
      width: '35%',
      key: 'actions',
      render: function (i) {
        return (
          <TableActions>
            <>
              <UserAddOutlined data-cy="adduser" className="add" onClick={() => modalAction('open', 'addUser', i)} />
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

            <OrgGroupsLink
              className="link"
              groupSlug={i.name}
              organizationSlug={organizationId}
              organizationName={organizationName}
              key={i.id}
            >
              <EditOutlined className="edit" />
            </OrgGroupsLink>

            {i.type !== 'project-default-group' && (
              <>
                <DeleteOutlined
                  data-cy="deleteGroup"
                  className="delete"
                  onClick={() => modalAction('open', 'deleteGroup', i)}
                />

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
                          return <div>{error.message}</div>;
                        }
                        if (data) {
                          refetch().then(() => modalAction('close', 'deleteGroup'));
                        }

                        return (
                          <Button
                            testId="confirm"
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
