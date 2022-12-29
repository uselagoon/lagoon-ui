import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import { bp, color } from 'lib/variables';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/AddUserToGroup/logic';
import ReactSelect from 'react-select';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


const ADD_GROUP_MEMBER_MUTATION = gql`
  mutation addUserToGroup($email: String!, $group: String!, $role: GroupRole!) {
    addUserToGroup(input:{
      user:{email: $email}
      group:{name: $group}
      role: $role
    }){
      name
    }
  }
`;

let options = [
  {
    label: 'Guest',
    value: 'GUEST'
  },
  {
    label: 'Reporter',
    value: 'REPORTER'
  },
  {
    label: 'Developer',
    value: 'DEVELOPER'
  },
  {
    label: 'Maintainer',
    value: 'MAINTAINER'
  },
  {
    label: 'Owner',
    value: 'OWNER'
  }
];


const customStyles = {
  content : {
    width : '50%',
  }
};

/**
 * Confirms the deletion of the specified name and type.
 */
export const AddUserToGroup = ({
  group,
  inputValueEmail,
  groupName,
  setInputValue,
  selectedRole,
  setSelectedRole,
  onProceed,
  open,
  openModal,
  closeModal
}) => {
  return (
    <React.Fragment>
      <div className="margins"><Button action={openModal}>
        Add User
      </Button></div>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel={`Confirm`}
        style={customStyles}
      >
        <React.Fragment>
        <Mutation mutation={ADD_GROUP_MEMBER_MUTATION}>
          {(addGroupMember, {loading, error, data}) => {
            if (error) {
              return <div>{error.message}</div>;
            }
            if (data) {
              window.location.reload();
            }
            return (
              <div className="newMember">
                <h4>Add User</h4>
                <div className="form-box">
                  <label>Email Address: <input className="inputEmail" type="text" value={inputValueEmail} onChange={setInputValue} /></label>
                </div>
                <label>User Role:
                <div className="selectRole">
                  <ReactSelect
                    menuPortalTarget={document.body} 
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    aria-label="Role"
                    placeholder="Select a role..."
                    name="role"
                    value={options.find(o => o.value === selectedRole)}
                    onChange={selectedOption => setSelectedRole(selectedOption)}
                    options={options}
                    required
                  />
                </div></label>
                <div>
                  <p></p>
                  <Button
                    disabled={inputValueEmail === "" || selectedRole === undefined}
                    action={() => {
                      addGroupMember({
                      variables: {
                          email: inputValueEmail,
                          role: selectedRole.value,
                          group: group.name,
                        }
                      });
                      }
                    }
                    variant='green'
                  >Add
                  </Button>
                </div>
              </div>
            );
          }}
          </Mutation>
        </React.Fragment>
      </Modal>
      <style jsx>{`
        .margins{
          margin-right: 10px;
        }
        .modal-content {
          max-width: 70%;
        }
        .form-box input, textarea{
          display: block;
          width: 100%;
          border-width:1px;
          border-style: solid;
          border-radius: 4px;
          min-height: 38px;
          border-color: hsl(0,0%,80%);
          font-family: 'source-code-pro',sans-serif;
          font-size: 0.8125rem;
          color: #5f6f7a;
          padding: 8px;
          box-sizing: border-box;
        }
        input[type="text"]:focus {
          border: 2px solid ${color.linkBlue};
          outline: none;
        }
        .selectRole {
          font-family: 'source-sans-pro', sans-serif;
          line-height: 1.25rem;
        }
        .environment-name {
          font-weight: bold;
          color: ${color.lightBlue};
        }
        a.hover-state {
          margin-right: 10px;
          color: ${color.blue};
        }
        .form-input {
          display: flex;
          align-items: center;
        }
      `}</style>
    </React.Fragment>
  );
};

export default withLogic(AddUserToGroup);
