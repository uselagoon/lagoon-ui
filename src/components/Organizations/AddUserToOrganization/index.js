import React, { useState } from 'react';
import ReactSelect from 'react-select';

import { useMutation } from '@apollo/client';
import Button from 'components/Button';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/AddUserToOrganization/logic';
import gql from 'graphql-tag';

import { userTypeOptions } from '../Manage';
import { Footer } from '../SharedStyles';
import { NewUser } from './Styles';

export const ADD_USER_MUTATION = gql`
  mutation AddAdminToOrganization($email: String!, $organization: Int!, $role: OrganizationRole!) {
    addAdminToOrganization(input: { user: { email: $email }, organization: { id: $organization }, role: $role }) {
      id
    }
  }
`;

/**
 *  Adds/edits user to an organization
 */
export const AddUserToOrganization = ({ organization, close, inputValueEmail, setInputValue, onAddUser, users }) => {
  const userAlreadyExists = users.find(u => u.email === inputValueEmail);

  const [newUserType, setNewUserType] = useState('viewer');
  const [addUser, { loading, error }] = useMutation(ADD_USER_MUTATION, {
    variables: {
      email: inputValueEmail,
      organization: organization.id,
      role: newUserType.toUpperCase(),
    },
    onError: e => console.error(e),
    onCompleted: () => {
      onAddUser().then(() => {
        setInputValue({ target: { value: '' } });
        close();
      });
    },
  });

  return (
    <>
      {error && <div>{error.message}</div>}
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
        <br />
        <label>
          User Type: <span style={{ color: '#E30000' }}>*</span>
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
            value={userTypeOptions.find(o => o.value === newUserType)}
            onChange={selectedOption => {
              setNewUserType(selectedOption.value);
            }}
            options={userTypeOptions}
            required
          />
        </label>
        <div>
          <Footer>
            <Button
              testId="addUserConfirm"
              disabled={inputValueEmail === '' || loading}
              loading={loading}
              action={addUser}
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
    </>
  );
};

export default withLogic(AddUserToOrganization);
