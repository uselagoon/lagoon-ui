import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Link from 'next/link';

import { DisconnectOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { Tooltip } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';
import RemoveUserConfirm from 'components/Organizations/RemoveUserConfirm';
import ProjectGroupLink from 'components/link/Organizations/ProjectGroup';
import ProjectLink from 'components/link/Project';
import gql from 'graphql-tag';

import AddUserToGroup, { ADD_GROUP_MEMBER_MUTATION, options } from '../AddUserToGroup';
import { RoleSelect } from '../AddUserToGroup/Styles';
import { IconDashboard } from '../CustomIcons/OrganizationIcons';
import PaginatedTable from '../PaginatedTable/PaginatedTable';
import { ProjectDashboard } from '../Projects/Styles';
import {
  AddButtonContent,
  Footer,
  ModalChildren,
  RemoveModalHeader,
  RemoveModalParagraph,
  TableActions,
  TableWrapper,
  Tag,
} from '../SharedStyles';
import { StyledGroupMembers } from './Styles';

export const getLinkData = (userSlug, organizationSlug, organizationId, orgFriendlyName) => ({
  urlObject: {
    pathname: '/organizations/user',
    query: { userSlug, organizationSlug, organizationId, orgFriendlyName },
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
  orgFriendlyName,
  orgProjects,
  projects,
  refetch,
}) => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');

  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

  const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);
  const [updatePending, setUpdatePending] = useState(false);

  const [modalState, setModalState] = useState({
    open: false,
    current: '',
  });

  const [updateUser] = useMutation(ADD_GROUP_MEMBER_MUTATION);

  const closeModal = () => {
    setModalState({ open: false, current: '' });
  };

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
        const { firstName, email } = user;

        const isDefaultUser = email.startsWith('default-user');

        if (isDefaultUser) return <div className="firstName"></div>;

        return firstName ? <div className="firstName">{firstName}</div> : <> - </>;
      },
    },
    {
      width: '20%',
      key: 'lastName',
      render: ({ user }) => {
        const { lastName, email } = user;

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
      width: '30%',
      key: 'email',
      render: ({ user }) => {
        const linkData = getLinkData(user.email, organizationName, organizationId, orgFriendlyName);
        return (
          <div className="email">
            <Link href={linkData.urlObject} as={linkData.asPath} className="link">
              {user.email}
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
      render: ({ user, role }) => {
        const linkData = getLinkData(user.email, organizationName, organizationId, orgFriendlyName);
        return (
          <TableActions>
            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit role">
              <span
                className="link"
                onClick={() =>
                  setModalState({
                    open: true,
                    current: {
                      email: user.email,
                      role,
                    },
                  })
                }
              >
                <EditOutlined className="edit" />
              </span>
            </Tooltip>
            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="View user">
              <>
                <Link href={linkData.urlObject} as={linkData.asPath} className="link">
                  <EyeOutlined className="view" />
                </Link>
              </>
            </Tooltip>
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
            className="link"
            projectGroupSlug={project.name}
            organizationSlug={organizationName}
            organizationId={organizationId}
            orgFriendlyName={orgFriendlyName}
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
            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="View project">
              <>
                <ProjectGroupLink
                  className="link"
                  projectGroupSlug={project.name}
                  organizationSlug={organizationName}
                  organizationId={organizationId}
                  orgFriendlyName={orgFriendlyName}
                  key={project.id}
                >
                  <EyeOutlined className="view" />
                </ProjectGroupLink>
              </>
            </Tooltip>

            <ProjectLink projectSlug={project.name} key={project.id} openInTab>
              <Tooltip overlayClassName="orgTooltip" title="View Dashboard" placement="bottom">
                <ProjectDashboard $inlineLink>
                  <IconDashboard />
                </ProjectDashboard>
              </Tooltip>
            </ProjectLink>

            <Tooltip overlayClassName="orgTooltip" title="Unlink" placement="bottom">
              <>
                <Button
                  variant="red"
                  action={() => {
                    setSelectedProject(project.id);
                    setProjectModalOpen(true);
                  }}
                  icon={<DisconnectOutlined className="delete" />}
                />
              </>
            </Tooltip>

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
          defaultViewOptions={{
            type: 'user',
            selected: false,
            selectedOnZeroCount: true,
          }}
        />
        <div className="tableAction">
          <Tooltip overlayClassName="orgTooltip" title="Add a user to the group" placement="bottom">
            <>
              <Button action={() => setAddUserModalOpen(true)}>
                <AddButtonContent>Add user</AddButtonContent>
              </Button>
            </>
          </Tooltip>
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
          <Tooltip overlayClassName="orgTooltip" title="Add an existing project to this group" placement="bottom">
            <>
              <Button action={() => setAddProjectModalOpen(true)}>
                <AddButtonContent>Add project</AddButtonContent>
              </Button>
            </>
          </Tooltip>
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

      <Modal style={{ content: { width: '50%' } }} isOpen={modalState.open} onRequestClose={closeModal}>
        <ModalChildren>
          <div className="form-box">
            <label>
              Email:
              <input disabled className="inputName" type="text" value={modalState.current.email} />
            </label>
          </div>
          <label>
            User Role: <span style={{ color: '#E30000' }}>*</span>
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
                aria-label="Role"
                placeholder="Select role"
                name="role"
                value={options.find(o => o.value === modalState.current.role)}
                onChange={selectedOption => {
                  const clone = { ...modalState };
                  clone.current.role = selectedOption.value;

                  setModalState(clone);
                }}
                options={options}
                required
              />
            </RoleSelect>
          </label>
        </ModalChildren>

        <Footer>
          <Button
            disabled={updatePending}
            loading={updatePending}
            action={() => {
              setUpdatePending(true);
              updateUser({
                variables: {
                  email: modalState.current.email,
                  role: modalState.current.role,
                  group: groupName,
                },
              })
                .then(() => {
                  closeModal();
                  refetch();
                })
                .finally(() => setUpdatePending(false));
            }}
            variant="primary"
          >
            Update
          </Button>

          <Button variant="ghost" action={closeModal}>
            Cancel
          </Button>
        </Footer>
      </Modal>
    </StyledGroupMembers>
  );
};

export default GroupMembers;
