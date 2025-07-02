import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Button from 'components/Button';
import { StyledAccount, AccountForm } from 'components/Account/StyledAccount';

import gql from 'graphql-tag';

const UPDATE_USER = gql`
  mutation updateUser(
    $email: String!
    $fname: String!
    $lname: String!
  ) {
    updateUser(
      input: {
        user: { email: $email }
        patch: {
          email: $email
          firstName: $fname
          lastName: $lname
        }
      }
    ) {
      email
      firstName
      lastName
    }
  }
`;


const Account = ({ me: { email, firstName, lastName }, loading, handleRefetch }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (!loading) {
      setFormData({
        email,
        firstName,
        lastName,
      });
    }
  }, [loading, email, firstName, lastName]);

  const [updateUser, { loading: updating, error }] = useMutation(UPDATE_USER, {
    variables: {
      email: formData.email,
      fname: formData.firstName,
      lname: formData.lastName,
    },
    onCompleted: () => {
      handleRefetch(); // re-fetch user data if needed
    },
    onError: (err) => {
      console.error('Update failed:', err);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };

  if (loading) return <p>Loading...</p>;

  return (
      <StyledAccount>
          <h2>Your Account</h2>
          <AccountForm onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="button-container">
                  <Button variant="primary" type="submit" disabled={updating} loading={updating}>
                    {updating ? 'Saving...' : 'Update Account'}
                  </Button>
              </div>
              {error && <div className="error">{error.message}</div>}
          </AccountForm>
      </StyledAccount>
  );
};

export default Account;
