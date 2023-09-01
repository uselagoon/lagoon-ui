import { FC } from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Button from 'components/Button';
import gql from 'graphql-tag';

import { NewMember, RoleSelect } from '../AddUserToGroup/Styles';
import { Footer } from '../SharedStyles';

const ADD_GROUP_MEMBER_MUTATION = gql`
  mutation addUserToGroup($email: String!, $group: String!, $role: GroupRole!) {
    addUserToGroup(input: { user: { email: $email }, group: { name: $group }, role: $role }) {
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

const AddUserToGroupSelect: FC<Props> = ({ groups, newUserState, setNewUserState, close, onAddUser }) => {
  const groupOptions = groups.map(g => {
    return { label: g.name, value: g.name };
  });

  const resetState = () => setNewUserState({ group: '', role: '', email: '' });

  return (
    <Mutation<{
      addGroupMember: {
        email: string;
        role: string;
        group: string;
      };
    }>
      mutation={ADD_GROUP_MEMBER_MUTATION}
      onError={err => console.error(err)}
    >
      {(addGroupMember, { error, data }) => {
        if (error) {
          return <div>{error.message}</div>;
        }
        if (data) {
          void onAddUser().then(() => {
            resetState();
            close();
          });
        }
        return (
          <NewMember>
            <h4>Add User to group</h4>
            <div className="form-box">
              <label>
                User name: <span style={{ color: '#E30000' }}>*</span>
                <input
                  className="inputName"
                  type="text"
                  placeholder="Enter name"
                  value={newUserState.email}
                  onChange={e => setNewUserState({ ...newUserState, email: e.target.value })}
                />
              </label>
            </div>
            <label>
              Group: <span style={{ color: '#E30000' }}>*</span>
              <RoleSelect>
                <ReactSelect
                  className="select"
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9999, color: 'black' }) }}
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
                  className="select"
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9999, color: 'black' }) }}
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
            <div>
              <Footer>
                <Button
                  disabled={!Object.values(newUserState).every(item => !!item)}
                  action={() => {
                    void addGroupMember({
                      variables: {
                        email: newUserState.email,
                        role: newUserState.role,
                        group: newUserState.group,
                      },
                    });
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
        );
      }}
    </Mutation>
  );
};

export default AddUserToGroupSelect;
