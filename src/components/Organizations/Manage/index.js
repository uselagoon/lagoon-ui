import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';
import withLogic from 'components/Organizations/Users/logic';
import gql from 'graphql-tag';

import useSortableData from '../../../lib/withSortedItems';
import AddUserToOrganization, { ADD_USER_MUTATION } from '../AddUserToOrganization';
import { NewUser } from '../AddUserToOrganization/Styles';
import PaginatedTable from '../PaginatedTable/PaginatedTable';
import { AddButtonContent, Footer, RemoveModalHeader, RemoveModalParagraph, TableActions, Tag } from '../SharedStyles';
import { StyledUsers } from '../Users/Styles';

const DELETE_USER = gql`
  mutation removeUserFromOrganization($organization: Int!, $email: String!) {
    removeUserFromOrganization(input: { user: { email: $email }, organization: $organization }) {
      id
    }
  }
`;

/**
 * The list of owners.
 */
const Manage = ({ users = [], organization, organizationName, refetch }) => {
  const [selectedUser, setSelectedUser] = useState('');

  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

  const [dynamicUsers, setDynamicUsers] = useState(users);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserOwner, setSelectedUserOwner] = useState(false);

  const closeUserModal = () => {
    setSelectedUser('');
    setDeleteUserModalOpen(false);
  };

  const closeEditModal = () => {
    setSelectedUser('');
    setEditModalOpen(false);
  };

  useEffect(() => {
    setDynamicUsers(users);
  }, [users]);

  const { sortedItems } = useSortableData(dynamicUsers, {
    key: 'email',
    direction: 'ascending',
  });

  useEffect(() => {
    if (sortedItems) {
      setDynamicUsers(sortedItems);
    }
  }, [sortedItems]);

  const UsersColumns = [
    {
      width: '15%',
      key: 'firstName',
      render: ({ firstName, email }) => {
        const isDefaultUser = email.startsWith('default-user');

        if (isDefaultUser) return <div className="firstName"></div>;

        return firstName ? <div className="name">{firstName}</div> : <> - </>;
      },
    },
    {
      width: '15%',
      key: 'lastName',
      render: ({ lastName, email }) => {
        const isDefaultUser = email.startsWith('default-user');
        if (isDefaultUser)
          return (
            <Tag style={{ display: 'inline' }} background="#262D65">
              DEFAULT USER
            </Tag>
          );
        return lastName ? <div className="lastname">{lastName}</div> : <> - </>;
      },
    },
    {
      width: '55%',
      key: 'email',
      render: ({ email, owner }) => {
        return (
          <>
            <div className="email" style={{ width: '60%' }}>
              <span>{email}</span>
            </div>

            {owner ? (
              <Tag style={{ display: 'inline-block', marginLeft: '2.5rem' }} background="#47D3FF">
                ORG OWNER
              </Tag>
            ) : (
              <Tag style={{ display: 'inline-block', marginLeft: '2.5rem' }} background="#FF4747">
                ORG VIEWER
              </Tag>
            )}
          </>
        );
      },
    },
    {
      width: '15%',
      key: 'actions',
      render: ({ ...user }) => {
        return (
          <TableActions>
            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit user">
              <span
                className="link"
                onClick={() => {
                  setSelectedUser(user?.id);
                  setEditModalOpen(true);
                  setSelectedUserOwner(user.owner);
                }}
              >
                <EditOutlined className="edit" />
              </span>
            </Tooltip>
            <Modal
              style={{ content: { width: '50%' } }}
              isOpen={editModalOpen && selectedUser === user?.id}
              onRequestClose={closeEditModal}
            >
              <Mutation mutation={ADD_USER_MUTATION} onError={err => console.error(err)}>
                {(addUser, { called, error, data }) => {
                  if (error) {
                    return <div>{error.message}</div>;
                  }
                  if (data) {
                    setSelectedUser('');
                    refetch().then(closeEditModal);
                  }
                  return (
                    <NewUser>
                      <h4>Update user</h4>
                      <div className="form-box">
                        <label>
                          User Email: <span style={{ color: '#E30000' }}></span>
                          <input className="inputEmail" type="text" value={user.email} disabled />
                        </label>
                      </div>
                      <label>
                        Owner: <span style={{ color: '#E30000' }}>*</span>
                        <input
                          className="inputCheckbox"
                          data-cy="userIsOwner"
                          type="checkbox"
                          checked={selectedUserOwner}
                          onChange={() => setSelectedUserOwner(!selectedUserOwner)}
                        />
                      </label>

                      <div>
                        <Footer>
                          <Button
                            testId="updateUser"
                            disabled={called}
                            loading={called}
                            action={() => {
                              addUser({
                                variables: {
                                  email: user.email,
                                  organization: organization.id,
                                  owner: selectedUserOwner,
                                },
                              });
                            }}
                            variant="primary"
                          >
                            Update
                          </Button>
                          <Button variant="ghost" action={closeEditModal}>
                            Cancel
                          </Button>
                        </Footer>
                      </div>
                    </NewUser>
                  );
                }}
              </Mutation>
            </Modal>

            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Remove user">
              <DeleteOutlined
                className="delete"
                onClick={() => {
                  setSelectedUser(user?.id);
                  setDeleteUserModalOpen(true);
                }}
              />
            </Tooltip>

            <Modal isOpen={deleteUserModalOpen && selectedUser === user?.id} onRequestClose={closeUserModal}>
              <RemoveModalHeader>Are you sure?</RemoveModalHeader>
              <RemoveModalParagraph>
                This action will remove user <span>{user.email}</span> from management of the organization{' '}
                <span>{organizationName}</span>.
              </RemoveModalParagraph>

              <Footer>
                <Mutation mutation={DELETE_USER}>
                  {(removeUserFromOrganization, { called, error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      refetch().then(() => {
                        return setDeleteUserModalOpen(false);
                      });
                    }
                    return (
                      <Button
                        testId="deleteConfirm"
                        variant="primary"
                        loading={called}
                        disabled={called}
                        action={() => {
                          removeUserFromOrganization({
                            variables: {
                              email: user.email,
                              organization: organization.id,
                            },
                          });
                        }}
                      >
                        Continue
                      </Button>
                    );
                  }}
                </Mutation>
                <Button variant="ghost" action={closeUserModal}>
                  Cancel
                </Button>
              </Footer>
            </Modal>
          </TableActions>
        );
      },
    },
  ];

  return (
    <StyledUsers>
      <PaginatedTable
        limit={10}
        data={dynamicUsers}
        columns={UsersColumns}
        usersTable={true}
        labelText="Administrators"
        emptyText="No administrators"
      />

      <Modal
        isOpen={addUserModalOpen}
        style={{ content: { width: '50%' } }}
        onRequestClose={() => setAddUserModalOpen(false)}
      >
        <AddUserToOrganization
          users={dynamicUsers}
          organization={organization}
          modalOpen={addUserModalOpen}
          close={() => setAddUserModalOpen(false)}
          onAddUser={refetch}
        />
      </Modal>

      <div>
        <Tooltip overlayClassName="orgTooltip" title="Add an administrator" placement="bottom">
          <>
            <Button testId="addUserbtn" action={() => setAddUserModalOpen(true)}>
              <AddButtonContent>Add user</AddButtonContent>
            </Button>
          </>
        </Tooltip>
      </div>

      <div className="separator" style={{ margin: '3rem 0' }}></div>
    </StyledUsers>
  );
};

export default withLogic(Manage);