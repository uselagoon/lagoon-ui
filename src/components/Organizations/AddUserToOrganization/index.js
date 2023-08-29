import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';

import Button from 'components/Button';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/AddUserToOrganization/logic';
import gql from 'graphql-tag';

import { Footer } from '../SharedStyles';
import { NewUser, OrganizationSelect } from './Styles';

const ADD_USER_MUTATION = gql`
  mutation AddUserToOrganization($email: String!, $organization: Int!, $owner: Boolean) {
    addUserToOrganization(input: { user: { email: $email }, organization: $organization, owner: $owner }) {
      id
    }
  }
`;

/**
 * Confirms the deletion of the specified name and type.
 */
export const AddUserToOrganization = ({ organization, close, inputValueEmail, setInputValue, onAddUser }) => {
  const [selectedOrganization, setSelectedOrganization] = useState(organization);

  let options = [
    {
      label: organization && organization.name,
      value: organization && organization.id,
    },
  ];

  return (
    <Mutation mutation={ADD_USER_MUTATION} onError={err => console.error(err)}>
      {(addUser, { error, data }) => {
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
            <h4>Add User</h4>
            <div className="form-box">
              <label>
                User name: <span style={{ color: '#E30000' }}>*</span>
                <input
                  className="inputEmail"
                  type="text"
                  placeholder="Enter email"
                  value={inputValueEmail}
                  onChange={setInputValue}
                />
              </label>
            </div>
            <label>
              Organization <span style={{ color: '#E30000' }}>*</span>
              <OrganizationSelect>
                <ReactSelect
                  className="select"
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9999, color: 'black' }) }}
                  aria-label="Organization"
                  name="organization"
                  value={options.find(o => o.value === selectedOrganization.id)}
                  onChange={selectedOption => setSelectedOrganization(selectedOption)}
                  options={options}
                  required
                />
              </OrganizationSelect>
            </label>
            <div>
              <Footer>
                <Button
                  disabled={inputValueEmail === '' || !selectedOrganization}
                  action={() => {
                    addUser({
                      variables: {
                        email: inputValueEmail,
                        organization: organization.id,
                        owner: true,
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
          </NewUser>
        );
      }}
    </Mutation>
  );
};

export default withLogic(AddUserToOrganization);
