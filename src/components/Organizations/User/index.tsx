import React, { FC, useState } from 'react';
import { Mutation } from 'react-apollo';

import Link from 'next/link';

import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import RemoveUserConfirm from 'components/Organizations/RemoveUserConfirm';

import gql from 'graphql-tag';

import { CancelButton, DeleteButton, ModalFooter } from '../Groups/Styles';
import PaginatedTable from '../PaginatedTable/PaginatedTable';
import { TableActions } from '../SharedStyles';
import { Header, StyledUser, UserWrapper } from './Styles';

export const getLinkData = (userSlug, organizationSlug, organizationName) => ({
  urlObject: {
    pathname: '/organizations/users',
    query: { user: userSlug, organizationSlug: organizationSlug, organizationName: organizationName },
  },
  asPath: `/organizations/${organizationSlug}/users/${userSlug}`,
});

const DELETE_USER_FROM_GROUP = gql`
  mutation removeUserFromGroup($email: String!, $groupId: String!) {
    removeUserFromGroup(input: {
      user: {
        email: $email
      },
      group: {
        id: $groupId
      }
    }) {
      id
      name
    }
  }
`;

const DELETE_USER_FROM_PROJECT = gql`
  mutation removeUserFromProject($email: String!, $groupId: String!) {
    removeUserFromProject(input: {
      user: {
        email: $email
      },
      group: {
        id: $groupId
      }
    }) {
      id
      name
    }
  }
`;

interface UserProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    groups: [];
  },
  refetch: any
}

/**
 * Displays user information.
 */
const User: FC<UserProps> = ({ user, organization, organizationName, organizationId, refetch }) => {

  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');

  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

  const closeGroupModal = () => {
    setSelectedGroup('');
    setGroupModalOpen(false);
  };
  
  const UserColumns = [
    {
      width: '20%',
      key: 'group',
      render: ({ id, name, projects }) => {
        return name ? <div className="group">{name}</div> : <>group name - </>;
      },
    },
    {
      width: '20%',
      key: 'roles',
      render: ({ ...rest }) => {
        console.log(rest);
        
        const role = rest?.role;
        return role ? <div className="role">{role}</div> : <>role - </>;
      },
    },
    {
      width: '55%',
      key: 'separator',
      render: () => {
        return <></>;
      },
    },
    {
      width: '25%',
      key: 'actions',
      render: (group) => {
        const linkData = getLinkData(user?.email, organizationId, organizationName);
        return (
          <TableActions>
            <Link href={linkData.urlObject} as={linkData.asPath}>
              <a className="link">
                <EyeOutlined className="view" />
              </a>
            </Link>
            <DeleteOutlined
              className="delete"
              onClick={() => {
                setSelectedGroup(group?.id);
                setGroupModalOpen(true);
              }}
            />
            <Modal isOpen={groupModalOpen && selectedGroup === group?.id} onRequestClose={closeGroupModal}>
              <h3 style={{ fontSize: '24px', lineHeight: '24px', paddingTop: '32px' }}>Are you sure?</h3>
              <p style={{ fontSize: '16px', lineHeight: '24px' }}>
                This action will delete this entry, you might not be able to get this back.
              </p>

              <ModalFooter>
                <Mutation mutation={DELETE_USER_FROM_GROUP}>
                  {(removeUserFromGroup, { error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      refetch().then(() => setDeleteUserModalOpen(false));
                    }
                    return (
                      <RemoveUserConfirm
                        removeName={user?.email}
                        onRemove={() => {
                          removeUserFromGroup({
                            variables: {
                              email: user?.email,
                              groupId: group?.id
                            }
                          });
                        }}
                      />
                    );
                  }}
                </Mutation>
                <CancelButton onClick={closeGroupModal}>Cancel</CancelButton>
              </ModalFooter>
            </Modal>
          </TableActions>
        );
      },
    },
  ];

  if (!user) return <p style={{textAlign:"center"}}>User not found</p>
  
  return (
    <StyledUser>
        <PaginatedTable
          limit={10}
          data={user?.groups}
          columns={UserColumns}
          usersTable
          labelText="Groups"
          emptyText="No groups"
        />

        <div style={{ width: '100px' }}>
          <Button action={() => setAddUserModalOpen(true)}>
            <span style={{ display: 'inline-flex', alignContent: 'center', gap: '10px' }}>
              <span style={{ fontSize: '28px' }}>+</span>
              <span style={{ fontSize: '16px', lineHeight: '24px' }}>Group</span>
            </span>
          </Button>
        </div>

        <Modal
          isOpen={addUserModalOpen}
          style={{ content: { width: '50%' } }}
          onRequestClose={() => setAddUserModalOpen(false)}
        >
          <Mutation mutation={DELETE_USER_FROM_GROUP}>
            {(removeUserFromGroup, { error, data }) => {
              if (error) {
                return <div>{error.message}</div>;
              }

              if (data) {
                refetch().then(() => setDeleteUserModalOpen(false));
              }

              return (
                <RemoveUserConfirm
                  removeName={user.email}
                  onRemove={() => {
                    removeUserFromGroup({
                      variables: {
                        email: user.email,
                        groupId: group.id
                      },
                    });
                  }}
                />
              );
            }}
            </Mutation>
        </Modal>

        {/* <div className="data-table">
          {user?.groups.map(group => (
            <div key={group.name} className="data-row">
              <div className="group-name">
                <label className="group">{group.name}</label>
              </div>
              <div className="roles">
                <label className="default-user-label">{user?.roles.map(role => role.role)}</label>
              </div>
              <div className="view">
                <Button variant="white" action="" icon="edit"></Button>
              </div>
                <div className="remove">
                  <Mutation mutation={DELETE_USER_FROM_GROUP}>
                    {(removeUserFromGroup, { error, data }) => {
                      if (error) {
                        return <div>{error.message}</div>;
                      }

                      if (data) {
                        refetch().then(() => setDeleteUserModalOpen(false));
                      }

                      return (
                        <RemoveUserConfirm
                          removeName={user.email}
                          onRemove={() => {
                            removeUserFromGroup({
                              variables: {
                                email: user.email,
                                groupId: group.id
                              },
                            });
                          }}
                        />
                      );
                    }}
                  </Mutation>
                </div>
            </div>
          ))}
        </div> */}

        <div className="header">
          <label>Projects</label>
        </div>
        <div className="data-table">
          {user?.groups?.map((group) =>
            group.projects?.map((project) => (
              <div key={project.name} className="data-row">
                <div className="project-name">
                  <label className="project">{project.name}</label>
                </div>
                <div></div>
                <div className="view">
                  <Button variant="white" action="" icon="edit"></Button>
                </div>
                <div className="remove">
                  <Mutation mutation={DELETE_USER_FROM_PROJECT}>
                    {(removeUserFromProject, { loading, called, error, data }) => {
                      if (error) {
                        return <div>{error.message}</div>;
                      }
                      if (data) {
                        onUserDeleted().then(closeModal);
                      }

                      return <></>
                      // return (
                        // <DeleteConfirm
                        //   deleteName={user.email}
                        //   deleteType="user"
                        //   icon="bin"
                        //   onDelete={() => {
                        //     removeUserFromProject({
                        //       variables: {
                        //         user: user.email,
                        //         groupId: group.id
                        //       },
                        //     });
                        //   }}
                        // />
                      // );
                    }}
                  </Mutation>
                </div>
              </div>
            ))
          )}
      </div>
    </StyledUser>
  );
};

export default User;
