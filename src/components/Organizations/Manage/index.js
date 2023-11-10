import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';

import Link from 'next/link';

import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
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

export const getLinkData = (userSlug, organizationSlug, organizationName) => ({
  urlObject: {
    pathname: '/organizations/user',
    query: { userSlug, organizationSlug: organizationSlug, organizationName: organizationName },
  },
  asPath: `/organizations/${organizationSlug}/users/${userSlug}`,
});
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
const Manage = ({ users = [], organization, organizationId, organizationName, refetch }) => {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');

  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

  const [dynamicUsers, setDynamicUsers] = useState(users);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserOwner, setSelectedUserOwner] = useState(false);

  const closeUserModal = () => {
    setSelectedUser('');
    setUserModalOpen(false);
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
        const linkData = getLinkData(email, organizationId, organizationName);
        return (
          <>
            <div className="email" style={{ width: '60%' }}>
              <Link href={linkData.urlObject} as={linkData.asPath}>
                <a>{email}</a>
              </Link>
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
        const linkData = getLinkData(user.email, organizationId, organizationName);
        return (
          <TableActions>
            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="View user">
              <>
                <Link href={linkData.urlObject} as={linkData.asPath}>
                  <EyeOutlined className="link" />
                </Link>
              </>
            </Tooltip>

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
                          type="checkbox"
                          checked={selectedUserOwner}
                          onChange={() => setSelectedUserOwner(!selectedUserOwner)}
                        />
                      </label>

                      <div>
                        <Footer>
                          <Button
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

            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Delete user">
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
                This action will delete user <span>{user.email}</span> from <span>{organizationName}</span>{' '}
                Organization.
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
            <Button action={() => setAddUserModalOpen(true)}>
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
