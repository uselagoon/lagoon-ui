import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Button from 'components/Button';
import withLogic from 'components/Organizations/AddUserToGroup/logic';
import gql from 'graphql-tag';

import { Footer } from '../SharedStyles';
import { NewMember, RoleSelect } from './Styles';

export const ADD_GROUP_MEMBER_MUTATION = gql`
  mutation addUserToGroup($email: String!, $group: String!, $role: GroupRole!, $inviteUser: Boolean) {
    addUserToGroup(input: { user: { email: $email }, group: { name: $group }, role: $role, inviteUser: $inviteUser }) {
      name
    }
  }
`;

export const options = [
  {
    label: 'Guest',
    value: 'GUEST',
  },
  {
    label: 'Reporter',
    value: 'REPORTER',
  },
  {
    label: 'Developer',
    value: 'DEVELOPER',
  },
  {
    label: 'Maintainer',
    value: 'MAINTAINER',
  },
  {
    label: 'Owner',
    value: 'OWNER',
  },
];

/**
 * Adds user to group.
 */
export const AddUserToGroup = ({
  group,
  close,
  inputValueEmail,
  setInputValue,
  selectedRole,
  setSelectedRole,
  onAddUser,
  users,
}) => {
  const userAlreadyExists = users && users.find(u => u.user.email === inputValueEmail);

  const [inviteUser, setInviteUser] = useState(true);

  const closeModal = () => {
    close();
    setInviteUser(true);
  };

  return (
    <Mutation mutation={ADD_GROUP_MEMBER_MUTATION} onError={err => console.error(err)}>
      {(addGroupMember, { called, error, data }) => {
        if (error) {
          return <div>{error.message}</div>;
        }
        if (data) {
          onAddUser().then(() => {
            setInputValue({ target: { value: '' } });
            closeModal();
          });
        }
        return (
          <NewMember>
            <h4>{userAlreadyExists ? 'Update User' : 'Add User'}</h4>
            <div className="form-box">
              <label>
                User Email: <span style={{ color: '#E30000' }}>*</span>
                <input
                  className="inputEmail"
                  data-cy="orgUser-email-input"
                  type="text"
                  placeholder="Enter Email"
                  value={inputValueEmail}
                  onChange={e => setInputValue({ target: { value: e.target.value.trim() } })}
                />
              </label>
            </div>
            <label>
              User Role: <span style={{ color: '#E30000' }}>*</span>
              <RoleSelect>
                <ReactSelect
                  classNamePrefix="react-select"
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
                  value={options.find(o => o.value === selectedRole)}
                  onChange={selectedOption => setSelectedRole(selectedOption)}
                  options={options}
                  required
                />
              </RoleSelect>
            </label>
            <label className="add-user">
              Invite user to Lagoon
              <Tooltip
                overlayClassName="orgTooltip"
                title="This will invite the user to Lagoon if the user doesn't exist. If the user already exists, it will just skip the invite."
                placement="bottom"
              >
                <InfoCircleOutlined style={{ fontSize: '1rem' }} />
              </Tooltip>
              <input
                data-cy="inviteUser"
                className="inputCheckbox"
                type="checkbox"
                checked={inviteUser}
                onChange={() => setInviteUser(!inviteUser)}
              />
            </label>
            <div>
              <Footer>
                <Button
                  testId="addUserToGroup"
                  disabled={called || inputValueEmail === '' || !selectedRole}
                  action={() => {
                    addGroupMember({
                      variables: {
                        email: inputValueEmail,
                        role: selectedRole.value,
                        group: group.name,
                        inviteUser,
                      },
                    });
                  }}
                  variant="primary"
                  loading={called}
                >
                  {userAlreadyExists ? 'Update' : 'Add'}
                </Button>
                <Button variant="ghost" action={() => closeModal()}>
                  Cancel
                </Button>
              </Footer>
            </div>
          </NewMember>
        );
      }}
    </Mutation>
  );
};

export default withLogic(AddUserToGroup);
