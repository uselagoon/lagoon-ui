import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import useSortableData from '../../../lib/withSortedItems';
import withLogic from 'components/Organizations/users/logic';

import { Header, StyledUsers, UserWrapper } from './Styles';
import Button from 'components/Button';

import gql from 'graphql-tag';


/**
 * Displays user information.
 */
const User = ({ user = [], organization, organizationId, organizationName }) => {

  console.log(user);
  // const { sortedItems, getClassNamesFor, requestSort } = useSortableData(users, {
  //   key: 'email',
  //   direction: 'ascending',
  // });

  // const [searchInput, setSearchInput] = useState('');
  // const handleSort = key => {
  //   return requestSort(key);
  // };

  // if (sortedItems) {
  //   users = sortedItems
  // }

  // const filteredUsers = users.filter(key => {
  //   const sortByName = key.email.toLowerCase().includes(searchInput.toLowerCase());
  //   let sortByUrl = '';
  //   return ['email', '__typename'].includes(key) ? false : (true && sortByName) || sortByUrl;
  // });

  return (
    <StyledUsers>
      <div className="data-table">
        {/* {!users.length && <div className="data-none">No users</div>}
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
                  {(removeUserFromOrganization, { loading, called, error, data }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    }
                    if (data) {
                      onUserDeleted().then(closeModal);
                    }
                    return (
                      <DeleteConfirm
                        deleteName={user.email}
                        deleteType="user"
                        icon="bin"
                        onDelete={() => {
                          removeUserFromOrganization({
                            variables: {
                              user: user.email,
                            },
                          });
                        }}
                      />
                    );
                  }}
                </Mutation>
              </div>
          </div>
        ))} */}
      </div>
    </StyledUsers>
  );
};

export default withLogic(User);
