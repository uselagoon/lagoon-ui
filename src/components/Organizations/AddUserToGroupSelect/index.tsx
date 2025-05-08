import { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import ReactSelect from 'react-select';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Button from 'components/Button';
import gql from 'graphql-tag';

import { NewMember, RoleSelect } from '../AddUserToGroup/Styles';
import { Footer } from '../SharedStyles';

export const ADD_GROUP_MEMBER_MUTATION = gql`
  mutation addUserToGroup($email: String!, $group: String!, $role: GroupRole!, $inviteUser: Boolean) {
    addUserToGroup(input: { user: { email: $email }, group: { name: $group }, role: $role, inviteUser: $inviteUser }) {
      name
    }
  }
`;

const options = [
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

type NewUser = {
  email: string;
  role: string;
  group: string;
};
interface Props {
  groups: {
    id: string;
    name: string;
  }[];
  newUserState: NewUser;
  setNewUserState: React.Dispatch<React.SetStateAction<NewUser>>;
  close: () => void;
  onAddUser: () => Promise<void>;
}

type AddGroupMemberData = {
  addGroupMember: {
    email: string;
    role: string;
    group: string;
    inviteUser?: boolean;
  };
};

const AddUserToGroupSelect: FC<Props> = ({ groups, newUserState, setNewUserState, close, onAddUser }) => {
  const [inviteUser, setInviteUser] = useState(true);

  const groupOptions = groups.map(g => {
    return { label: g.name, value: g.name };
  });

  const resetState = () => {
    setNewUserState({ group: '', role: '', email: '' });
    setInviteUser(false);
  };

  const [ addGroupMember, {loading, error} ] = useMutation<AddGroupMemberData>(ADD_GROUP_MEMBER_MUTATION, {
    variables: {
      email: newUserState.email,
      role: newUserState.role,
      group: newUserState.group,
      inviteUser,
    },
    onCompleted: () => {
      void onAddUser().then(() => {
        resetState();
        close();
      });
    },
    onError: err => {
      console.error(err);
    },
  });

  return (
      <>
        {error ? <div>{error.message}</div> :
            <NewMember>
              <h4>Add user to a group</h4>
              <div className="form-box">
                <label>
                  User Email: <span style={{ color: '#E30000' }}>*</span>
                  <input
                      data-cy="addUserEmail"
                      className="inputEmail"
                      type="text"
                      placeholder="Enter Email"
                      value={newUserState.email}
                      onChange={e => setNewUserState({ ...newUserState, email: e.target.value.trim() })}
                  />
                </label>
              </div>
              <label>
                Group: <span style={{ color: '#E30000' }}>*</span>
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
                      aria-label="Group"
                      placeholder="Select group"
                      name="group"
                      value={groupOptions.find(o => o.value === newUserState.group)}
                      onChange={selectedOption =>
                          setNewUserState({ ...newUserState, group: selectedOption?.value as string })
                      }
                      options={groupOptions}
                      required
                  />
                </RoleSelect>
              </label>
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
                      value={options.find(o => o.value === newUserState.role)}
                      onChange={selectedOption =>
                          setNewUserState({ ...newUserState, role: selectedOption?.value as string })
                      }
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
                      testId="addUserConfirm"
                      loading={loading}
                      disabled={loading || !Object.values(newUserState).every(item => !!item)}
                      action={() => {
                        void addGroupMember()
                      }}
                      variant="primary"
                  >
                    Add
                  </Button>
                  <Button
                      variant="ghost"
                      action={() => {
                        resetState();
                        close();
                      }}
                  >
                    Cancel
                  </Button>
                </Footer>
              </div>
            </NewMember>
        }
      </>
  );
};

export default AddUserToGroupSelect;
