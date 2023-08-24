import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import OrgGroupsLink from 'components/link/Organizations/Group';
import gql from 'graphql-tag';

import AddUserToGroup from '../AddUserToGroup';
import NewGroup from '../NewGroup';
import OrgHeader from '../Orgheader';
import PaginatedTable from '../PaginatedTable/PaginatedTable';
import { Footer, TableActions, Tag } from '../SharedStyles';
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
      width: '30%',
      key: 'name',
      render: i => {
        return (
          <OrgGroupsLink
            groupSlug={i.name}
            organizationSlug={organizationId}
            organizationName={organizationName}
            key={i.id}
          >
            {i.name}
          </OrgGroupsLink>
        );
      },
    },

    {
      width: '20%',
      key: 'members',
      render: i => {
        return i.members && <span>Members: {i.members.length} </span>;
      },
    },
    {
      width: '25%',
      key: 'type',
      render: i => {
        return i.type === 'project-default-group' && <Tag background="#262D65">{i.type}</Tag>;
      },
    },
    {
      width: '25%',
      key: 'actions',
      render: function (i) {
        return (
          <TableActions>
            <>
              <UserAddOutlined className="add" onClick={() => modalAction('open', 'addUser', i)} />
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
                <DeleteOutlined className="delete" onClick={() => modalAction('open', 'deleteGroup', i)} />

                <Modal
                  isOpen={modalStates.deleteGroup.open && modalStates.deleteGroup.current.name === i.name}
                  onRequestClose={() => modalAction('close', 'deleteGroup')}
                >
                  <h3 style={{ fontSize: '24px', lineHeight: '24px', paddingTop: '32px' }}>Are you sure?</h3>
                  <p style={{ fontSize: '16px', lineHeight: '24px' }}>
                    This action will delete this entry, you might not be able to get this back.
                  </p>

                  <Footer>
                    <Mutation mutation={DELETE_GROUP}>
                      {(deleteGroup, { error, data }) => {
                        if (error) {
                          return <div>{error.message}</div>;
                        }
                        if (data) {
                          refetch().then(() => modalAction('close', 'deleteGroup'));
                          return <DeleteButton>Continue</DeleteButton>;
                        }
                        
                        return (
                          <Button
                            variant="primary"
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
      <OrgHeader headerText="Groups" />
      <StyledGroups>
        <PaginatedTable limit={10} data={groups} columns={Columns} withSorter numericSortKey='members' emptyText="No groups found" />
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
