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
import {
  AddButtonContent,
  Footer,
  RemoveModalHeader,
  RemoveModalParagraph,
  TableActions,
  TableWrapper,
} from '../SharedStyles';
import { StyledGroupMembers } from './Styles';

export const getLinkData = (userSlug, organizationSlug, organizationName) => ({
  urlObject: {
    pathname: '/organizations/user',
    query: { userSlug, organizationSlug: organizationSlug, organizationName: organizationName },
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
const GroupMembers = ({
  members = [],
  groupName,
  organizationName,
  organizationId,
  orgProjects,
  projects,
  refetch,
}) => {
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
        const name = user.firstName;
        return name ? <div>{name}</div> : <> - </>;
      },
    },
    {
      width: '20%',
      key: 'lastName',
      render: ({ user }) => {
        const lastName = user.lastName;
        return lastName ? <div className="lastname">{lastName}</div> : <> - </>;
      },
    },
    {
      width: '30%',
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
      width: '15%',
      key: 'role',
      render: u => {
        return <div className={`role ${u.role}-label`}>{u.role}</div>;
      },
    },

    {
      width: '15%',
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
              {(removeUserFromGroup, { called, error, data }) => {
                if (error) {
                  return <div>{error.message}</div>;
                }
                if (data) {
                  refetch().then(() => setDeleteUserModalOpen(false));
                }

                return (
                  <RemoveUserConfirm
                    loading={called}
                    removeName={user.email}
                    info={{ userEmail: user.email, groupName }}
                    onRemove={() => {
                      return Promise.resolve(
                        removeUserFromGroup({
                          variables: {
                            groupName: groupName,
                            email: user.email,
                          },
                        })
                      );
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
            <Button
              variant="red"
              action={() => {
                setSelectedProject(project.id);
                setProjectModalOpen(true);
              }}
              icon={<DisconnectOutlined className="delete" />}
            />

            <Modal isOpen={projectModalOpen && selectedProject === project.id} onRequestClose={closeProjectModal}>
              <RemoveModalHeader>Are you sure?</RemoveModalHeader>
              <RemoveModalParagraph>
                This action will unlink project <span>{project.name}</span> from group <span>{groupName}</span>.
              </RemoveModalParagraph>

              <Footer>
                <Mutation mutation={REMOVE_GROUP_FROM_PROJECT} onError={e => console.error(e)}>
                  {(removeGroupFromProject, { called, error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      refetch().then(closeProjectModal);
                    }
                    return (
                      <Button
                        variant="primary"
                        disabled={called}
                        loading={called}
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
          withSorter
          numericSortOptions={{
            displayName: 'Role',
            orderList: ['OWNER', 'MAINTAINER', 'DEVELOPER', 'REPORTER', 'GUEST'],
            orderListKey: 'role',
          }}
        />
        <div className="tableAction">
          <Button action={() => setAddUserModalOpen(true)}>
            <AddButtonContent>
              <span>+</span>
              <span>User</span>
            </AddButtonContent>
          </Button>
        </div>

        <Modal
          isOpen={addUserModalOpen}
          style={{ content: { width: '50%' } }}
          onRequestClose={() => setAddUserModalOpen(false)}
        >
          <AddUserToGroup
            users={members}
            group={{ name: groupName }}
            modalOpen={addUserModalOpen}
            close={() => setAddUserModalOpen(false)}
            onAddUser={refetch}
          />
        </Modal>

        <PaginatedTable
          limit={10}
          data={projects}
          columns={ProjectsColumns}
          labelText="Projects"
          emptyText="No Projects"
          disableUrlMutation
        />

        <div className="tableAction">
          <Button action={() => setAddProjectModalOpen(true)}>
            <AddButtonContent>
              <span>+</span>
              <span>Project</span>
            </AddButtonContent>
          </Button>
        </div>

        <Modal
          isOpen={addProjectModalOpen}
          style={{ content: { width: '50%' } }}
          onRequestClose={() => closeAddProjectModal()}
        >
          <Mutation mutation={ADD_GROUP_PROJECT_MUTATION} onError={e => console.error(e)}>
            {(addGroupToProject, { called, error, data }) => {
              if (error) {
                return <div>{error.message}</div>;
              }
              if (data) {
                refetch().then(closeAddProjectModal);
              }

              const filtered = orgProjects.filter(project => {
                return projects.every(p => p.name !== project.name);
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
                        styles={{
                          menuPortal: base => ({ ...base, zIndex: 9999, color: 'black', fontSize: '16px' }),
                          placeholder: base => ({ ...base, fontSize: '16px' }),
                          menu: base => ({ ...base, fontSize: '16px' }),
                          option: base => ({ ...base, fontSize: '16px' }),
                          singleValue: base => ({ ...base, fontSize: '16px' }),
                        }}
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
                      disabled={called || !selectedProject}
                      loading={called}
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
