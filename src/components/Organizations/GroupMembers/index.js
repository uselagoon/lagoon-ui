import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Link from 'next/link';

import { DisconnectOutlined, EyeOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import RemoveUserConfirm from 'components/Organizations/RemoveUserConfirm';
import ProjectGroupLink from 'components/link/Organizations/ProjectGroup';
import gql from 'graphql-tag';

import AddUserToGroup from '../AddUserToGroup';
import { RoleSelect } from '../AddUserToGroup/Styles';
import PaginatedTable from '../PaginatedTable/PaginatedTable';
import { Footer, TableActions, TableWrapper } from '../SharedStyles';
import { StyledGroupMembers } from './Styles';

export const getLinkData = (userSlug, organizationSlug, organizationName) => ({
  urlObject: {
    pathname: '/organizations/users',
    query: { user: userSlug, organizationSlug: organizationSlug, organizationName: organizationName },
  },
  asPath: `/organizations/${organizationSlug}/users/${userSlug}`,
});

const REMOVE_USER_FROM_GROUP = gql`
  mutation removeUserFromGroup($groupName: String!, $email: String!) {
    removeUserFromGroup(input: { group: { name: $groupName }, user: { email: $email } }) {
      name
    }
  }
`;

const REMOVE_GROUP_FROM_PROJECT = gql`
  mutation removeGroupFromProject($groupName: String!, $projectName: String!) {
    removeGroupsFromProject(input: { groups: [{ name: $groupName }], project: { name: $projectName } }) {
      name
    }
  }
`;

const ADD_GROUP_PROJECT_MUTATION = gql`
  mutation addProjectToGroup($groupName: String!, $projectName: String!) {
    addGroupsToProject(input: { groups: { name: $groupName }, project: { name: $projectName } }) {
      name
    }
  }
`;
/**
 * The primary list of members.
 */
const GroupMembers = ({ members = [], groupName, organizationName, organizationId, projects, refetch }) => {
  const duRegex = new RegExp('^default-user@' + groupName.replace('project-', '') + '$', 'g');

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');

  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

  const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);

  const closeAddProjectModal = () => {
    setSelectedProject('');
    setAddProjectModalOpen(false);
  };
  const closeProjectModal = () => {
    setSelectedProject('');
    setProjectModalOpen(false);
  };
  const UserColumns = [
    {
      width: '20%',
      key: 'name',
      render: ({ user }) => {
        const name = user.name;
        return name ? <div className="name">{name}</div> : <>First name - </>;
      },
    },
    {
      width: '20%',
      key: 'lastName',
      render: ({ user }) => {
        const lastName = user.lastName;
        return lastName ? <div className="lastname">{lastName}</div> : <>Last name -</>;
      },
    },
    {
      width: '20%',
      key: 'email',
      render: ({ user }) => {
        const linkData = getLinkData(user.email, organizationId, organizationName);
        return (
          <div className="email">
            <Link href={linkData.urlObject} as={linkData.asPath}>
              <a> {user.email}</a>
            </Link>
          </div>
        );
      },
    },
    {
      width: '20%',
      key: 'role',
      render: u => {
        return <div className={`role ${u.role}-label`}>{u.role}</div>;
      },
    },

    {
      width: '25%',
      key: 'actions',
      render: ({ user }) => {
        const linkData = getLinkData(user.email, organizationId, organizationName);
        return (
          <TableActions>
            <Link href={linkData.urlObject} as={linkData.asPath}>
              <a className="link">
                <EyeOutlined className="view" />
              </a>
            </Link>

            <Mutation mutation={REMOVE_USER_FROM_GROUP}>
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
                          groupName: groupName,
                          email: user.email,
                        },
                      });
                    }}
                  />
                );
              }}
            </Mutation>
          </TableActions>
        );
      },
    },
  ];

  const ProjectsColumns = [
    {
      width: '20%',
      key: 'name',
      render: project => {
        const { id, name } = project;

        return (
          <ProjectGroupLink
            projectGroupSlug={name}
            organizationSlug={organizationId}
            organizationName={organizationName}
            key={id}
          >
            {name}
          </ProjectGroupLink>
        );
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
      render: project => {
        return (
          <TableActions>
            <DisconnectOutlined
              className="delete"
              onClick={() => {
                setSelectedProject(project.id);
                setProjectModalOpen(true);
              }}
            />
            <Modal isOpen={projectModalOpen && selectedProject === project.id} onRequestClose={closeProjectModal}>
              <h3 style={{ fontSize: '24px', lineHeight: '24px', paddingTop: '32px' }}>Are you sure?</h3>
              <p style={{ fontSize: '16px', lineHeight: '24px' }}>
                This action will delete this entry, you might not be able to get this back.
              </p>

              <Footer>
                <Mutation mutation={REMOVE_GROUP_FROM_PROJECT} onError={e => console.error(e)}>
                  {(removeGroupFromProject, { error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      refetch().then(closeProjectModal);
                    }
                    return (
                      <Button
                        variant="primary"
                        action={() => {
                          removeGroupFromProject({
                            variables: {
                              groupName,
                              projectName: project.name,
                            },
                          });
                        }}
                      >
                        Continue
                      </Button>
                    );
                  }}
                </Mutation>
                <Button variant="ghost" action={closeProjectModal}>
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
    <StyledGroupMembers>
      <TableWrapper>
        <PaginatedTable
          limit={10}
          data={members}
          columns={UserColumns}
          usersTable
          labelText="Users"
          emptyText="No users"
          disableUrlMutation
        />

        <div className="tableAction">
          <Button action={() => setAddUserModalOpen(true)}>
            <span style={{ display: 'inline-flex', alignContent: 'center', gap: '10px' }}>
              <span style={{ fontSize: '28px' }}>+</span>
              <span style={{ fontSize: '16px', lineHeight: '24px' }}>User</span>
            </span>
          </Button>
        </div>

        <Modal
          isOpen={addUserModalOpen}
          style={{ content: { width: '50%' } }}
          onRequestClose={() => setAddUserModalOpen(false)}
        >
          <AddUserToGroup
            group={{ name: groupName }}
            modalOpen={addUserModalOpen}
            close={() => setAddUserModalOpen(false)}
            onAddUser={refetch}
          />
        </Modal>

        <PaginatedTable
          limit={10}
          data={projects.filter(project => {
            return project.groups.find(group => group.name === groupName);
          })}
          columns={ProjectsColumns}
          labelText="Projects"
          emptyText="No Projects"
          disableUrlMutation
        />

        <div className="tableAction">
          <Button action={() => setAddProjectModalOpen(true)}>
            <span style={{ display: 'inline-flex', alignContent: 'center', gap: '10px' }}>
              <span style={{ fontSize: '28px' }}>+</span>
              <span style={{ fontSize: '16px', lineHeight: '24px' }}>Project</span>
            </span>
          </Button>
        </div>

        <Modal
          isOpen={addProjectModalOpen}
          style={{ content: { width: '50%' } }}
          onRequestClose={() => closeAddProjectModal()}
        >
          <Mutation mutation={ADD_GROUP_PROJECT_MUTATION} onError={e => console.error(e)}>
            {(addGroupToProject, { error, data }) => {
              if (error) {
                return <div>{error.message}</div>;
              }
              if (data) {
                refetch().then(closeAddProjectModal);
              }

              const filtered = projects.filter(project => {
                if (project.groups.length === 0) return project;

                return project.groups.every(group => group.name !== groupName);
              });

              const opts = filtered.map(p => {
                return { label: p.name, value: p.name };
              });

              return (
                <>
                  <h4>Add Project</h4>
                  <label>
                    Project
                    <RoleSelect>
                      <ReactSelect
                        className="select"
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, color: 'black' }) }}
                        aria-label="project"
                        placeholder="Select a project..."
                        name="project"
                        value={opts.find(o => o.value === selectedProject)}
                        onChange={selectedOption => setSelectedProject(selectedOption.value)}
                        options={opts}
                        required
                      />
                    </RoleSelect>
                  </label>
                  <Footer>
                    <Button
                      action={() => {
                        addGroupToProject({
                          variables: {
                            projectName: selectedProject,
                            groupName,
                          },
                        });
                      }}
                      variant="primary"
                    >
                      Add
                    </Button>
                    <Button variant="ghost" action={() => closeAddProjectModal()}>
                      Cancel
                    </Button>
                  </Footer>
                </>
              );
            }}
          </Mutation>
        </Modal>
      </TableWrapper>
    </StyledGroupMembers>
  );
};

export default GroupMembers;
