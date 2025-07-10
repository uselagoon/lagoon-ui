import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
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

export const userTypes = ['viewer', 'admin', 'owner'];
export const userTypeOptions = userTypes.map(u => {
  return { label: u.toUpperCase(), value: u };
});

const DELETE_USER = gql`
  mutation removeAdminFromOrganization($organization: Int!, $email: String!) {
    removeAdminFromOrganization(input: { user: { email: $email }, organization: { id: $organization } }) {
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

  const [selectedUserType, setSelectedUserType] = useState('');

  const [addUser, { loading: addUserLoading, error: addUserError }] = useMutation(ADD_USER_MUTATION, {
    onCompleted: () => {
      setSelectedUser('');
      refetch().then(closeEditModal);
    },
    onError: e => {
      console.error(e);
    },
  });

  const [removeUserFromOrganization, { loading: removeUserLoading, error: removeUserError }] = useMutation(
    DELETE_USER,
    {
      onCompleted: () => {
        refetch().then(closeUserModal);
      },
      onError: e => {
        console.error(e);
      },
    }
  );

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
            <Tag style={{ display: 'inline' }} $background="#262D65">
              DEFAULT USER
            </Tag>
          );
        return lastName ? <div className="lastname">{lastName}</div> : <> - </>;
      },
    },
    {
      width: '55%',
      key: 'email',
      render: ({ email, owner, admin }) => {
        return (
          <>
            <div className="email" style={{ width: '60%' }}>
              <span>{email}</span>
            </div>

            {owner ? (
              <Tag style={{ display: 'inline-block', marginLeft: '2.5rem' }} $background="#FF4747">
                ORG OWNER
              </Tag>
            ) : admin ? (
              <Tag style={{ display: 'inline-block', marginLeft: '2.5rem' }} $background="#E69138">
                ORG ADMIN
              </Tag>
            ) : (
              <Tag style={{ display: 'inline-block', marginLeft: '2.5rem' }} $background="#47D3FF">
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
                  setSelectedUserType(user.owner ? 'owner' : user.admin ? 'admin' : 'viewer');
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
              {addUserError ? (
                <>
                  <div>{addUserError?.message}</div>
                  <Button variant="ghost" action={closeEditModal}>
                    Cancel
                  </Button>
                </>
              ) : (
                <NewUser>
                  <h4>Update user</h4>
                  <div className="form-box">
                    <label>
                      User Email: <span style={{ color: '#E30000' }}></span>
                      <input className="inputEmail" type="text" value={user.email} disabled />
                    </label>
                  </div>

                  <br />
                  <label>
                    User Type: <span style={{ color: '#E30000' }}>*</span>
                    <ReactSelect
                      classNamePrefix="react-select"
                      className="select"
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: base => ({ ...base, zIndex: 9999, color: 'black', fontSize: '16px' }),
                        placeholder: base => ({ ...base, fontSize: '16px' }),
                        menu: base => ({ ...base, fontSize: '16px' }),
                        option: base => ({ ...base, fontSize: '16px' }),
                        singleValue: base => ({ ...base, fontSize: '16px' }),
                      }}
                      aria-label="Role"
                      placeholder="Select role"
                      name="role"
                      value={userTypeOptions.find(o => o.value === selectedUserType)}
                      onChange={selectedOption => {
                        setSelectedUserType(selectedOption.value);
                      }}
                      options={userTypeOptions}
                      required
                    />
                  </label>

                  <div>
                    <Footer>
                      <Button
                        testId="updateUser"
                        disabled={addUserLoading}
                        loading={addUserLoading}
                        action={() =>
                          addUser({
                            variables: {
                              email: user.email,
                              organization: organization.id,
                              role: selectedUserType.toUpperCase(),
                            },
                          })
                        }
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
              )}
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
              {removeUserError ? (
                <>
                  <div>{removeUserError?.message}</div>
                  <Button variant="ghost" action={closeEditModal}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Footer>
                  <Button
                    testId="deleteConfirm"
                    variant="primary"
                    loading={removeUserLoading}
                    disabled={removeUserLoading}
                    action={() =>
                      removeUserFromOrganization({
                        variables: {
                          email: user.email,
                          organization: organization.id,
                        },
                      })
                    }
                  >
                    Continue
                  </Button>
                  <Button variant="ghost" action={closeUserModal}>
                    Cancel
                  </Button>
                </Footer>
              )}
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
