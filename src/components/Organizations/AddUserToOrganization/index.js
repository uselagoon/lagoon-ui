import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Button from 'components/Button';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/AddUserToOrganization/logic';
import gql from 'graphql-tag';

import { Footer } from '../SharedStyles';
import { NewUser } from './Styles';

export const ADD_USER_MUTATION = gql`
  mutation AddUserToOrganization($email: String!, $organization: Int!, $owner: Boolean, $admin: Boolean) {
    addUserToOrganization(
      input: { user: { email: $email }, organization: $organization, owner: $owner, admin: $admin }
    ) {
      id
    }
  }
`;

/**
 *  Adds/edits user to an organization
 */
export const AddUserToOrganization = ({ organization, close, inputValueEmail, setInputValue, onAddUser, users }) => {
  const userAlreadyExists = users.find(u => u.email === inputValueEmail);

  const [checkboxValueOwner, setCheckboxValueOwner] = useState(false);
  const [checkboxValueAdmin, setCheckboxValueAdmin] = useState(false);

  const handleChange = type => {
    if (type === 'owner') {
      console.log('ran owner');
      setCheckboxValueAdmin(false);
      setCheckboxValueOwner(!checkboxValueOwner);
    }
    if (type === 'admin') {
      console.log('ran admin');
      setCheckboxValueOwner(false);
      setCheckboxValueAdmin(!checkboxValueAdmin);
    }
  };

  return (
    <Mutation mutation={ADD_USER_MUTATION} onError={err => console.error(err)}>
      {(addUser, { called, error, data }) => {
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
          <NewUser>
            <h4>{userAlreadyExists ? 'Update user' : 'Add User'}</h4>
            <div className="form-box">
              <label>
                User Email: <span style={{ color: '#E30000' }}>*</span>
                <input
                  data-cy="manageEmail"
                  className="inputEmail"
                  type="text"
                  placeholder="Enter Email"
                  value={inputValueEmail}
                  onChange={e => setInputValue({ target: { value: e.target.value.trim() } })}
                />
              </label>
            </div>
            <label>
              Owner: <span style={{ color: '#E30000' }}>*</span>
              <input
                data-cy="manageOwner"
                className="inputCheckbox"
                type="checkbox"
                checked={checkboxValueOwner}
                value={checkboxValueOwner}
                onChange={() => handleChange('owner')}
              />
            </label>
            <span> </span>
            <label>
              Admin: <span style={{ color: '#E30000' }}>*</span>
              <input
                data-cy="manageAdmin"
                className="inputCheckbox"
                type="checkbox"
                checked={checkboxValueAdmin}
                value={checkboxValueAdmin}
                onChange={() => handleChange('admin')}
              />
            </label>

            <div>
              <Footer>
                <Button
                  testId="addUserConfirm"
                  disabled={called || inputValueEmail === ''}
                  loading={called}
                  action={() => {
                    addUser({
                      variables: {
                        email: inputValueEmail,
                        organization: organization.id,
                        owner: checkboxValueOwner,
                        admin: checkboxValueAdmin,
                      },
                    });
                  }}
                  variant="primary"
                >
                  {userAlreadyExists ? 'Update' : 'Add'}
                </Button>
                <Button variant="ghost" action={() => close()}>
                  Cancel
                </Button>
              </Footer>
            </div>
          </NewUser>
        );
      }}
    </Mutation>
  );
};

export default withLogic(AddUserToOrganization);
