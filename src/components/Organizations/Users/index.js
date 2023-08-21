import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import useSortableData from '../../../lib/withSortedItems';
import withLogic from 'components/Organizations/users/logic';

import Link from 'next/link';

import AddUserToOrganization from '../AddUserToOrganization';
import Modal from 'components/Modal';
import RemoveUserConfirm from 'components/Organizations/RemoveUserConfirm';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { CancelButton, DeleteButton, ModalFooter } from '../Groups/Styles';
import PaginatedTable from '../PaginatedTable/PaginatedTable';

import { TableActions } from '../SharedStyles';
import { Header, StyledUsers } from './Styles';
import Button from 'components/Button';

import gql from 'graphql-tag';


export const getLinkData = (userSlug, organizationSlug, organizationName) => ({
  urlObject: {
    pathname: '/organizations/users',
    query: { user: userSlug, organizationSlug: organizationSlug, organizationName: organizationName },
  },
  asPath: `/organizations/${organizationSlug}/users/${userSlug}?limit=10&page=1`,
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

  const closeUserModal = () => {
    setSelectedUser('');
    setUserModalOpen(false);
  };

  const { sortedItems, getClassNamesFor, requestSort } = useSortableData(users, {
    key: 'email',
    direction: 'ascending',
  });

  const [searchInput, setSearchInput] = useState('');
  const handleSort = key => {
    return requestSort(key);
  };

  if (sortedItems) {
    users = sortedItems
  }

  const filteredUsers = users.filter(key => {
    const sortByName = key.email.toLowerCase().includes(searchInput.toLowerCase());
    let sortByUrl = '';
    return ['email', '__typename'].includes(key) ? false : (true && sortByName) || sortByUrl;
  });

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
        return organization ? <div className="projects">Projects: {organization.projects.length}</div> : <>Projects -</>;
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
                setUserModalOpen(true);
              }}
            />
            <Modal isOpen={userModalOpen && selectedUser === user?.id} onRequestClose={closeUserModal}>
              <h3 style={{ fontSize: '24px', lineHeight: '24px', paddingTop: '32px' }}>Are you sure?</h3>
              <p style={{ fontSize: '16px', lineHeight: '24px' }}>
                This action will delete this entry, you might not be able to get this back.
              </p>

              <ModalFooter>
                <Mutation mutation={DELETE_USER}>
                  {(removeUserFromOrganizationGroups, { error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      refetch().then(() => { 
                        return setDeleteUserModalOpen(false)
                      });
                    }
                    return (
                      <RemoveUserConfirm
                        removeName={user?.email}
                        onRemove={() => {
                          removeUserFromOrganizationGroups({
                            variables: {
                              email: user?.email,
                              organization: organization.id
                            },
                          });
                        }}
                      />
                    );
                  }}
                </Mutation>
                <CancelButton onClick={closeUserModal}>Cancel</CancelButton>
              </ModalFooter>
            </Modal>
          </TableActions>
        );
      },
    },
  ];

  return (
    <StyledUsers>
      {/* <Header>
        <button
          type="button"
          onClick={() => handleSort('firstName')}
          className={`button-sort firstNameSort ${getClassNamesFor('firstName')}`}
        >
          First Name
        </button>
        <button
          type="button"
          onClick={() => handleSort('lastName')}
          className={`button-sort lastNameSort ${getClassNamesFor('lastName')}`}
        >
          Last Name
        </button>
        <button
          type="button"
          onClick={() => handleSort('email')}
          className={`button-sort emailSort ${getClassNamesFor('email')}`}
        >
          Email
        </button>
      </Header> */}

      <PaginatedTable
        limit={10}
        data={users}
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
