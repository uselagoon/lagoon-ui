import React, { FC, useState } from 'react';
import { Mutation } from 'react-apollo';

import Link from 'next/link';

import { DisconnectOutlined, EyeOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import ProjectGroupLink from 'components/link/Organizations/ProjectGroup';
import gql from 'graphql-tag';

import PaginatedTable from '../PaginatedTable/PaginatedTable';
import { Footer, TableActions, TableWrapper } from '../SharedStyles';
import { StyledUser } from './Styles';

type Group = {
  id: string;
  name: string;
  __typename?: 'Group';
  projects?: {
    id: string;
    name: string;
    __typename: 'Project';
  }[];
};
type User = {
  id: string;
  name: string;
  email: string;
  groups: {
    id: string;
    name: string;
    projects: {
      id: string;
      name: string;
    }[];
  }[];
  roles: {
    id: string;
    name: string;
    role: string;
  }[];
};

export const getLinkData = (userSlug: string, organizationSlug: string, organizationName: string) => ({
  urlObject: {
    pathname: '/organizations/users',
    query: { user: userSlug, organizationSlug: organizationSlug, organizationName: organizationName },
  },
  asPath: `/organizations/${organizationSlug}/users/${userSlug}`,
});

const DELETE_USER_FROM_GROUP = gql`
  mutation removeUserFromGroup($email: String!, $groupId: String!) {
    removeUserFromGroup(input: { user: { email: $email }, group: { id: $groupId } }) {
      id
      name
    }
  }
`;

interface UserProps {
  user: User;
  organizationName: string;
  organizationId: string;
  refetch: () => void;
}

/**
 * Displays user information.
 */
const User: FC<UserProps> = ({ user, organizationName, organizationId, refetch }) => {
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');

  const closeGroupModal = () => {
    setSelectedGroup('');
    setGroupModalOpen(false);
  };

  const closeProjectModal = () => {
    setSelectedProject('');
    setProjectModalOpen(false);
  };

  const UserColumns = [
    {
      width: '20%',
      key: 'group',
      render: ({ name }: Group) => {
        return name ? <div className="group">{name}</div> : <>Group name - </>;
      },
    },
    {
      width: '75%',
      key: 'roles',
      render: (group: Group) => {
        const { roles } = user;
        const { id: groupId } = group;
        const role = roles.find(r => r.id === groupId)?.role;

        return role ? <div className="role">{role}</div> : <>Role - </>;
      },
    },
    {
      width: '25%',
      key: 'actions',
      render: (group: Group) => {
        const groupLinkData = (groupSlug: string, organizationSlug: string, organizationName: string) => ({
          urlObject: {
            pathname: '/organizations/group',
            query: { groupName: groupSlug, organizationSlug: organizationSlug, organizationName: organizationName },
          },
          asPath: `/organizations/${organizationSlug}/groups/${groupSlug}`,
        });

        const linkData = groupLinkData(group.name, organizationId, organizationName);

        return (
          <TableActions>
            <Link href={linkData.urlObject} as={linkData.asPath}>
              <a className="link">
                <EyeOutlined className="view" />
              </a>
            </Link>
            <DisconnectOutlined
              className="delete"
              onClick={() => {
                setSelectedGroup(group?.id);
                setGroupModalOpen(true);
              }}
            />
            <Modal
              variant="delete"
              contentLabel="unlinkuser"
              isOpen={groupModalOpen && selectedGroup === group?.id}
              onRequestClose={closeGroupModal}
            >
              <h3 style={{ fontSize: '24px', lineHeight: '24px', paddingTop: '32px' }}>Are you sure?</h3>
              <p style={{ fontSize: '16px', lineHeight: '24px' }}>
                This action will delete this entry, you might not be able to get this back.
              </p>

              <Footer>
                <Mutation<{
                  removeUserFromGroup: {
                    email: string;
                    groupId: string;
                  };
                }>
                  mutation={DELETE_USER_FROM_GROUP}
                >
                  {(removeUserFromGroup, { error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      refetch();
                    }
                    return (
                      <Button
                        variant="primary"
                        action={() => {
                          void removeUserFromGroup({
                            variables: {
                              email: user?.email,
                              groupId: group?.id,
                            },
                          });
                        }}
                      >
                        Continue
                      </Button>
                    );
                  }}
                </Mutation>
                <Button variant="ghost" action={closeGroupModal}>
                  Cancel
                </Button>
              </Footer>
            </Modal>
          </TableActions>
        );
      },
    },
  ];

  const UserProjectColumns = [
    {
      width: '80%',
      key: 'name',
      render: ({ name }: { name: string }) => {
        return name ? <div className="group">{name}</div> : <>Group name - </>;
      },
    },

    {
      width: '20%',
      key: 'actions',
      render: ({ name }: { name: string }) => {
        return (
          <TableActions>
            <ProjectGroupLink
              className="link"
              projectGroupSlug={name}
              organizationSlug={organizationId}
              organizationName={organizationName}
              key={name}
            >
              <EyeOutlined className="edit" style={{ width: '27px' }} />
            </ProjectGroupLink>
          </TableActions>
        );
      },
    },
  ];

  if (!user) return <p style={{ textAlign: 'center' }}>User not found</p>;

  const userProjects = [...new Set(user.groups.map(g => g.projects).flat())];

  return (
    <StyledUser>
      <TableWrapper>
        <>
          <PaginatedTable
            limit={10}
            data={user.groups}
            columns={UserColumns}
            labelText="Groups"
            emptyText="No groups"
            disableUrlMutation
          />
          <div className="separator" style={{ margin: '3rem 0' }}></div>
          <PaginatedTable
            limit={10}
            data={userProjects}
            columns={UserProjectColumns}
            labelText="Projects"
            emptyText="No projects"
            disableUrlMutation
          />
          <div className="separator" style={{ margin: '3rem 0' }}></div>
        </>
      </TableWrapper>
    </StyledUser>
  );
};

export default User;
