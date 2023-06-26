import React from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Button from 'components/Button';
import Modal from 'components/Modal';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/AddUserToGroup/logic';
import gql from 'graphql-tag';

import { NewMember, RoleSelect, StyledAddToGroup } from './Styles';

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

const customStyles = {
  content: {
    width: '50%',
  },
};

/**
 * Confirms the deletion of the specified name and type.
 */
export const AddUserToGroup = ({
  group,
  inputValueEmail,
  setInputValue,
  selectedRole,
  setSelectedRole,
  open,
  openModal,
  closeModal,
  disabled,
  onAddUser,
}) => {
  return (
    <StyledAddToGroup>
      <div className="margins">
        <Button disabled={disabled} action={openModal}>
          Add User
        </Button>
      </div>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`} style={customStyles}>
        <React.Fragment>
          <Mutation mutation={ADD_GROUP_MEMBER_MUTATION}>
            {(addGroupMember, { loading, error, data }) => {
              if (error) {
                return <div>{error.message}</div>;
              }
              if (data) {
                onAddUser().then(closeModal);
              }
              return (
                <NewMember>
                  <h4>Add User</h4>
                  <div className="form-box">
                    <label>
                      Email Address:{' '}
                      <input className="inputEmail" type="text" value={inputValueEmail} onChange={setInputValue} />
                    </label>
                  </div>
                  <label>
                    User Role:
                    <RoleSelect>
                      <ReactSelect
                        className="select"
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999, color: 'black' }) }}
                        aria-label="Role"
                        placeholder="Select a role..."
                        name="role"
                        value={options.find(o => o.value === selectedRole)}
                        onChange={selectedOption => setSelectedRole(selectedOption)}
                        options={options}
                        required
                      />
                    </RoleSelect>
                  </label>
                  <div>
                    <p></p>
                    <Button
                      disabled={inputValueEmail === '' || selectedRole === undefined}
                      action={() => {
                        addGroupMember({
                          variables: {
                            email: inputValueEmail,
                            role: selectedRole.value,
                            group: group.name,
                          },
                        });
                      }}
                      variant="green"
                    >
                      Add
                    </Button>
                  </div>
                </NewMember>
              );
            }}
          </Mutation>
        </React.Fragment>
      </Modal>
    </StyledAddToGroup>
  );
};

export default withLogic(AddUserToGroup);
