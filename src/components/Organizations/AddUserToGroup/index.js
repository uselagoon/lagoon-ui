import React from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Button from 'components/Button';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/AddUserToGroup/logic';
import gql from 'graphql-tag';

import { Footer } from '../SharedStyles';
import { NewMember, RoleSelect } from './Styles';

const ADD_GROUP_MEMBER_MUTATION = gql`
  mutation addUserToGroup($email: String!, $group: String!, $role: GroupRole!) {
    addUserToGroup(input: { user: { email: $email }, group: { name: $group }, role: $role }) {
      name
    }
  }
`;

let options = [
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
 * Confirms the deletion of the specified name and type.
 */
export const AddUserToGroup = ({
  group,
  close,
  inputValueEmail,
  setInputValue,
  selectedRole,
  setSelectedRole,
  onAddUser,
}) => {
  return (
    <Mutation mutation={ADD_GROUP_MEMBER_MUTATION} onError={err => console.error(err)}>
      {(addGroupMember, { error, data }) => {
        if (error) {
          return <div>{error.message}</div>;
        }
        if (data) {
          onAddUser().then(() => {
            setInputValue({ target: { value: '' } });
            close();
          });
        }
        return (
          <NewMember>
            <h4>Add User</h4>
            <div className="form-box">
              <label>
                User name: <span style={{ color: '#E30000' }}>*</span>
                <input
                  className="inputName"
                  type="text"
                  placeholder="Enter name"
                  value={inputValueEmail}
                  onChange={setInputValue}
                />
              </label>
            </div>
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
                  value={options.find(o => o.value === selectedRole)}
                  onChange={selectedOption => setSelectedRole(selectedOption)}
                  options={options}
                  required
                />
              </RoleSelect>
            </label>
            <div>
              <Footer>
                <Button
                  disabled={inputValueEmail === '' || !selectedRole}
                  action={() => {
                    addGroupMember({
                      variables: {
                        email: inputValueEmail,
                        role: selectedRole.value,
                        group: group.name,
                      },
                    });
                  }}
                  variant="primary"
                >
                  Add
                </Button>
                <Button variant="ghost" action={() => close()}>
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
