import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';

import Link from 'next/link';

import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import withLogic from 'components/Organizations/users/logic';
import gql from 'graphql-tag';

import useSortableData from '../../../lib/withSortedItems';
import AddUserToOrganization from '../AddUserToOrganization';
import PaginatedTable from '../PaginatedTable/PaginatedTable';
import { Footer, TableActions } from '../SharedStyles';
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
      render: ({ firstName }) => {
        return firstName ? <div className="name">{firstName}</div> : <>First name - </>;
      },
    },
    {
      width: '15%',
      key: 'lastName',
      render: ({ lastName }) => {
        return lastName ? <div className="lastname">{lastName}</div> : <>Last name -</>;
      },
    },
    {
      width: '25%',
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
      render: () => {
        return organization ? <div className="groups">Groups: {organization.groups.length}</div> : <>Groups -</>;
      },
    },
    {
      width: '15%',
      key: 'projects',
      render: () => {
        return organization ? (
          <div className="projects">Projects: {organization.projects.length}</div>
        ) : (
          <>Projects -</>
        );
      },
    },

    {
      width: '15%',
      key: 'actions',
      render: ({ ...user }) => {
        const linkData = getLinkData(user?.email, organizationId, organizationName);
        return (
          <TableActions>
            <Link href={linkData.urlObject} as={linkData.asPath}>
              <a className="link">
                <EyeOutlined className="edit" />
              </a>
            </Link>
            <DeleteOutlined
              className="delete"
              onClick={() => {
                setSelectedUser(user?.id);
                setDeleteUserModalOpen(true);
              }}
            />
            <Modal isOpen={deleteUserModalOpen && selectedUser === user?.id} onRequestClose={closeUserModal}>
              <h3 style={{ fontSize: '24px', lineHeight: '24px', paddingTop: '32px' }}>Are you sure?</h3>
              <p style={{ fontSize: '16px', lineHeight: '24px' }}>
                This action will delete this entry, you might not be able to get this back.
              </p>

              <Footer>
                <Mutation mutation={DELETE_USER}>
                  {(removeUserFromOrganizationGroups, { error, data }) => {
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
        labelText="Users"
        emptyText="No Users"
      />

      <Modal
        isOpen={addUserModalOpen}
        style={{ content: { width: '50%' } }}
        onRequestClose={() => setAddUserModalOpen(false)}
      >
        <AddUserToOrganization
          organization={organization}
          modalOpen={addUserModalOpen}
          close={() => setAddUserModalOpen(false)}
          onAddUser={refetch}
        />
      </Modal>

      <div style={{ width: '100px' }}>
        <Button action={() => setAddUserModalOpen(true)}>
          <span style={{ display: 'inline-flex', alignContent: 'center', gap: '10px' }}>
            <span style={{ fontSize: '28px' }}>+</span>
            <span style={{ fontSize: '16px', lineHeight: '24px' }}>User</span>
          </span>
        </Button>
      </div>
    </StyledUsers>
  );
};

export default withLogic(Users);
