import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';

import Link from 'next/link';

import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';
import withLogic from 'components/Organizations/Users/logic';
import gql from 'graphql-tag';

import useSortableData from '../../../lib/withSortedItems';
import AddUserToGroupSelect from '../AddUserToGroupSelect';
import PaginatedTable from '../PaginatedTable/PaginatedTable';
import { AddButtonContent, Footer, RemoveModalHeader, RemoveModalParagraph, TableActions, Tag } from '../SharedStyles';
import { StyledUsers } from './Styles';

export const getLinkData = (userSlug, organizationSlug, organizationName) => ({
  urlObject: {
    pathname: '/organizations/user',
    query: { userSlug, organizationSlug: organizationSlug, organizationName: organizationName },
  },
  asPath: `/organizations/${organizationSlug}/users/${userSlug}`,
});
const DELETE_USER = gql`
  mutation removeUserFromOrganizationGroups($organization: Int!, $email: String!) {
    removeUserFromOrganizationGroups(input: { user: { email: $email }, organization: $organization }) {
      id
    }
  }
`;

/**
 * The primary list of users.
 */
const Users = ({ users = [], organization, organizationId, organizationName, refetch }) => {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');

  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [newUserState, setNewUserState] = useState({
    email: '',
    role: '',
    group: '',
  });

  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

  const [dynamicUsers, setDynamicUsers] = useState(users);

  const closeUserModal = () => {
    setSelectedUser('');
    setUserModalOpen(false);
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
      width: '30%',
      key: 'email',
      render: ({ email }) => {
        const linkData = getLinkData(email, organizationId, organizationName);
        return (
          <div className="email">
            <Link href={linkData.urlObject} as={linkData.asPath}>
              <a>{email}</a>
            </Link>
          </div>
        );
      },
    },
    {
      width: '15%',
      key: 'groups',
      render: user => {
        return <div className="groups">Groups: {user.groupRoles.length}</div>;
      },
    },
    {
      width: '25%',
      key: 'actions',
      render: ({ ...user }) => {
        const linkData = getLinkData(user?.email, organizationId, organizationName);
        return (
          <TableActions>
            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="View user">
              <>
                <Link href={linkData.urlObject} as={linkData.asPath}>
                  <a className="link">
                    <EyeOutlined className="edit" />
                  </a>
                </Link>
              </>
            </Tooltip>
            {!user.email.startsWith('default-user') ? (
              <>
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
                  <RemoveModalHeader>Remove user?</RemoveModalHeader>
                  <RemoveModalParagraph>
                    This action will remove this user from all groups, you might not be able to reverse this.
                  </RemoveModalParagraph>

                  <Footer>
                    <Mutation mutation={DELETE_USER}>
                      {(removeUserFromOrganizationGroups, { called, error, data }) => {
                        if (error) {
                          return <div className='error'>{error.message}</div>;
                        }
                        if (data) {
                          refetch().then(() => {
                            return setDeleteUserModalOpen(false);
                          });
                        }
                        return (
                          <Button
                            disabled={called}
                            loading={called}
                            variant="primary"
                            action={() => {
                              removeUserFromOrganizationGroups({
                                variables: {
                                  email: user?.email,
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
              </>
            ) : null}
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
        defaultViewOptions={{
          type: 'user',
          selected: false,
        }}
        labelText="Users"
        emptyText="No Users"
      />

      <Modal
        isOpen={addUserModalOpen}
        style={{ content: { width: '50%' } }}
        onRequestClose={() => setAddUserModalOpen(false)}
      >
        <AddUserToGroupSelect
          groups={organization.groups}
          newUserState={newUserState}
          setNewUserState={setNewUserState}
          modalOpen={addUserModalOpen}
          close={() => setAddUserModalOpen(false)}
          onAddUser={refetch}
        />
      </Modal>

      <div>
        <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Add user">
          <>
            <Button action={() => setAddUserModalOpen(true)}>
              <AddButtonContent>Add user</AddButtonContent>
            </Button>
          </>
        </Tooltip>
      </div>
    </StyledUsers>
  );
};

export default withLogic(Users);
