import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';

import Link from 'next/link';

import { DeleteOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import withLogic from 'components/Organizations/Users/logic';
import gql from 'graphql-tag';

import useSortableData from '../../../lib/withSortedItems';
import AddUserToOrganization from '../AddUserToOrganization';
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
      width: '60%',
      key: 'email',
      render: ({ email, owner }) => {
        const linkData = getLinkData(email, organizationId, organizationName);
        return (
          <>
            <div className="email" style={{ width: '200px' }}>
              <Link href={linkData.urlObject} as={linkData.asPath}>
                <a>{email}</a>
              </Link>
            </div>

            {owner ? (
              <Tag style={{ display: 'inline-block', marginLeft: '5rem' }} background="#47D3FF">
                ORG OWNER
              </Tag>
            ) : (
              <Tag style={{ display: 'inline-block', marginLeft: '5rem' }} background="#FF4747">
                ORG VIEWER
              </Tag>
            )}
          </>
        );
      },
    },
    {
      width: '10%',
      key: 'actions',
      render: ({ ...user }) => {
        return (
          <TableActions>
            <DeleteOutlined
              className="delete"
              onClick={() => {
                setSelectedUser(user?.id);
                setDeleteUserModalOpen(true);
              }}
            />
            <Modal isOpen={deleteUserModalOpen && selectedUser === user?.id} onRequestClose={closeUserModal}>
              <RemoveModalHeader>Are you sure?</RemoveModalHeader>
              <RemoveModalParagraph>
                This action will delete this entry, you might not be able to get this back.
              </RemoveModalParagraph>

              <Footer>
                <Mutation mutation={DELETE_USER}>
                  {(removeUserFromOrganization, { error, data }) => {
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
          organization={organization}
          modalOpen={addUserModalOpen}
          close={() => setAddUserModalOpen(false)}
          onAddUser={refetch}
        />
      </Modal>

      <div style={{ width: '100px' }}>
        <Button action={() => setAddUserModalOpen(true)}>
          <AddButtonContent>
            <span>+</span>
            <span>User</span>
          </AddButtonContent>
        </Button>
      </div>

      <div className="separator" style={{ margin: '3rem 0' }}></div>
    </StyledUsers>
  );
};

export default withLogic(Manage);
