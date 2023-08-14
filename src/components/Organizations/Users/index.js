import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import useSortableData from '../../../lib/withSortedItems';
import DeleteConfirm from 'components/DeleteConfirm';
import withLogic from 'components/Organizations/users/logic';

import { Header, StyledUsers } from './Styles';
import Button from 'components/Button';

import gql from 'graphql-tag';

const DELETE_USER = gql`
  mutation removeUserFromOrganizationGroups($organization: Int!, $email: String!) {
    removeUserFromOrganizationGroups(input: { user: { email: $email }, organization: $organization }) {
      id
    }
  }
`;

/**
 * The primary list of users.
 */
const Users = ({ users = [], organization, organizationId, organizationName, onUserDeleted, closeModal }) => {
  const { sortedItems, getClassNamesFor, requestSort } = useSortableData(users, {
    key: 'email',
    direction: 'ascending',
  });

  const [searchInput, setSearchInput] = useState('');
  const handleSort = key => {
    return requestSort(key);
  };

  if (sortedItems) {
    users = sortedItems
  }

  const filteredUsers = users.filter(key => {
    const sortByName = key.email.toLowerCase().includes(searchInput.toLowerCase());
    let sortByUrl = '';
    return ['email', '__typename'].includes(key) ? false : (true && sortByName) || sortByUrl;
  });

  return (
    <StyledUsers>
      <div className="header">
        <label>Users</label>
        <label></label>
        <input
          aria-labelledby="search"
          className="searchInput"
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Type to search"
          disabled={users.length === 0}
        />
      </div>
      <Header>
        <button
          type="button"
          onClick={() => handleSort('firstName')}
          className={`button-sort firstNameSort ${getClassNamesFor('firstName')}`}
        >
          First Name
        </button>
        <button
          type="button"
          onClick={() => handleSort('lastName')}
          className={`button-sort lastNameSort ${getClassNamesFor('lastName')}`}
        >
          Last Name
        </button>
        <button
          type="button"
          onClick={() => handleSort('email')}
          className={`button-sort emailSort ${getClassNamesFor('email')}`}
        >
          Email
        </button>
      </Header>
      <div className="data-table">
        {!users.length && <div className="data-none">No users</div>}
        {searchInput && !filteredUsers.length && <div className="data-none">No users matching "{searchInput}"</div>}
        {filteredUsers.map(user => (
          <div key={user.id} className="data-row" user={user.id}>
            <div className="firstName">
              <label className="firstName">{user.firstName}</label>
            </div>
            <div className="lastName">
              <label className="lastName">{user.lastName}</label>
            </div>
            <div className="email">
              <label className="default-user-label">{user.email}</label>
            </div>
            <div className="groups">Groups: {organization.groups.length}</div>
            <div className="projects">Projects: {organization.projects.length}</div>
             <div className="view">
              <Button variant="white" action="" href={`/organizations/${organization.id}/users/${user.email}`} icon="view"></Button>
             </div>
              <div className="remove">
                <Mutation mutation={DELETE_USER}>
                  {(removeUserFromOrganizationGroups, { loading, called, error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      onUserDeleted().then(() => {
                        // setSearchInput("");
                        closeModal();
                      });
                    }
                    return (
                      <DeleteConfirm
                        deleteName={user.email}
                        deleteType="user"
                        icon="bin"
                        onDelete={() => {
                          removeUserFromOrganizationGroups({
                            variables: {
                              email: user.email,
                              organization: organization.id
                            },
                          });
                        }}
                      />
                    );
                  }}
                </Mutation>
              </div>
          </div>
        ))}
      </div>
    </StyledUsers>
  );
};

export default withLogic(Users);
