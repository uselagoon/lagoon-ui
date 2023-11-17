import React, { FC, useState } from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Link from 'next/link';

import { DisconnectOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { Tooltip } from 'antd';
import Button from 'components/Button';
import Modal from 'components/Modal';
import gql from 'graphql-tag';

import { ADD_GROUP_MEMBER_MUTATION, options } from '../AddUserToGroup';
import { RoleSelect } from '../AddUserToGroup/Styles';
import PaginatedTable from '../PaginatedTable/PaginatedTable';
import {
  Footer,
  ModalChildren,
  RemoveModalHeader,
  RemoveModalParagraph,
  TableActions,
  TableWrapper,
} from '../SharedStyles';
import { StyledUser } from './Styles';

type Group = {
  id: string;
  name: string;
  type?: string | null;
  role?: string;
  __typename?: '"GroupRoleInterface"';
};
type User = {
  id: string;
  name: string;
  email: string;
  groupRoles: {
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
    query: { user: userSlug, organizationSlug, organizationName },
  },
  asPath: `/organizations/${organizationName}/users/${userSlug}`,
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

  const [updatePending, setUpdatePending] = useState(false);
  const [editModalState, setEditModalState] = useState({
    open: false,
    current: {
      email: '',
      role: '',
      group: '',
    },
  });

  const [updateUser] = useMutation(ADD_GROUP_MEMBER_MUTATION);

  const closeEditModal = () => {
    setEditModalState({
      open: false,
      current: {
        email: '',
        role: '',
        group: '',
      },
    });
  };

  const closeGroupModal = () => {
    setSelectedGroup('');
    setGroupModalOpen(false);
  };
  const groupLinkData = (groupSlug: string, organizationSlug: string, organizationName: string) => ({
    urlObject: {
      pathname: '/organizations/group',
      query: { groupName: groupSlug, organizationSlug, organizationName },
    },
    asPath: `/organizations/${organizationName}/groups/${groupSlug}`,
  });

  const UserColumns = [
    {
      width: '50%',
      key: 'group',
      render: ({ name, type }: Group) => {
        const linkData = groupLinkData(name, organizationId, organizationName);
        return (
          <>
            <Link href={linkData.urlObject} as={linkData.asPath}>
              <a className="link">{name ? name : <>Group name - </>}</a>
            </Link>

            {type === 'project-default-group' && <label className="default-group-label">SYSTEM GROUP</label>}
          </>
        );
      },
    },
    {
      width: '25%',
      key: 'roles',
      render: ({ role }: Group) => {
        return role ? <div className={`${role}-label`}>{role}</div> : <>Role - </>;
      },
    },
    {
      width: '25%',
      key: 'actions',
      render: (group: Group) => {
        const linkData = groupLinkData(group.name, organizationId, organizationName);

        return (
          <TableActions>
            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Edit role">
              <span
                className="link"
                onClick={() => {
                  group.role &&
                    setEditModalState({
                      open: true,
                      current: {
                        email: user.email,
                        role: group.role,
                        group: group.name,
                      },
                    });
                }}
              >
                <EditOutlined className="view" />
              </span>

              <Modal
                contentLabel="edituser"
                variant={null}
                style={{ content: { width: '50%' } }}
                isOpen={editModalState.open}
                onRequestClose={closeEditModal}
              >
                <ModalChildren>
                  <div className="form-box">
                    <label>
                      Email:
                      <input disabled className="inputName" type="text" value={editModalState.current.email} />
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
                        value={options.find(o => o.value === editModalState.current.role)}
                        onChange={selectedOption => {
                          const clone = { ...editModalState };
                          if (selectedOption && selectedOption.value) {
                            clone.current.role = selectedOption.value;
                            setEditModalState(clone);
                          }
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
                          email: editModalState.current.email,
                          role: editModalState.current.role,
                          group: editModalState.current.group,
                        },
                      })
                        .then(() => {
                          closeEditModal();
                          refetch();
                        })
                        .finally(() => setUpdatePending(false));
                    }}
                    variant="primary"
                  >
                    Update
                  </Button>

                  <Button variant="ghost" action={closeEditModal}>
                    Cancel
                  </Button>
                </Footer>
              </Modal>
            </Tooltip>

            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="View Group">
              <>
                <Link href={linkData.urlObject} as={linkData.asPath}>
                  <a className="link">
                    <EyeOutlined className="view" />
                  </a>
                </Link>
              </>
            </Tooltip>
            <Tooltip overlayClassName="orgTooltip" placement="bottom" title="Unlink Group">
              <DisconnectOutlined
                className="delete"
                onClick={() => {
                  setSelectedGroup(group?.id);
                  setGroupModalOpen(true);
                }}
              />
            </Tooltip>
            <Modal
              variant="delete"
              contentLabel="unlinkuser"
              isOpen={groupModalOpen && selectedGroup === group?.id}
              onRequestClose={closeGroupModal}
            >
              <RemoveModalHeader>Are you sure?</RemoveModalHeader>
              <RemoveModalParagraph>
                This action will unlink this user from group <span>{group.name}</span>.
              </RemoveModalParagraph>

              <Footer>
                <Mutation<{
                  removeUserFromGroup: {
                    email: string;
                    groupId: string;
                  };
                }>
                  mutation={DELETE_USER_FROM_GROUP}
                >
                  {(removeUserFromGroup, { called, error, data }) => {
                    if (error) {
                      return <div className="error">{error.message}</div>;
                    }
                    if (data) {
                      refetch();
                    }
                    return (
                      <Button
                        variant="primary"
                        disabled={called}
                        loading={called}
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

  if (!user) return <p style={{ textAlign: 'center' }}>User not found</p>;
  return (
    <StyledUser>
      <TableWrapper>
        <>
          <PaginatedTable
            limit={10}
            data={user.groupRoles}
            columns={UserColumns}
            labelText="Groups"
            emptyText="No groups"
            defaultViewOptions={{
              selected: false,
              type: 'group',
            }}
          />
          <div className="separator" style={{ margin: '3rem 0' }}></div>
        </>
      </TableWrapper>
    </StyledUser>
  );
};

export default User;
