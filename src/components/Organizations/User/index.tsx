import React, { FC } from 'react';
import { Mutation } from 'react-apollo';

import { Header, StyledUser, UserWrapper } from './Styles';
import Button from 'components/Button';
import DeleteConfirm from 'components/DeleteConfirm';

import gql from 'graphql-tag';

const DELETE_USER = gql`
  mutation removeUserFromOrganization($id: String, $email: String) {
    removeUserFromOrganization(input: { user: { id: $id, email: $email } })
  }
`;

interface UserProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    groups: [];
  };
}

/**
 * Displays user information.
 */
const User: FC<UserProps> = ({ user }) => {

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


  if (!user) return <p style={{textAlign:"center"}}>User not found</p>
  
  console.log("USER: ", user);


  return (
    <StyledUser>
      <div className="header">
        <label>User</label>
      </div>
      <div className="user">
        <div className="field">{user.firstName} {user.lastName}</div>
        <div className="header">
          <label>Groups</label>
        </div>
        <div className="data-table">
          {user?.groups.map(group => (
            <div key={group.name} className="data-row">
              <div className="group-name">
                <label className="group">{group.name}</label>
              </div>
              <div className="roles">
                <label className="default-user-label">{user?.roles.map(role => role.role)}</label>
              </div>
              <div className="view">
                <Button variant="white" action="" icon="edit"></Button>
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
          ))}
        </div>

        <div className="header">
          <label>Projects</label>
        </div>
        <div className="data-table">
          {user?.groups?.map((group) =>
            group.projects?.map((project) => (
              <div key={project.name} className="data-row">
                <div className="project-name">
                  <label className="project">{project.name}</label>
                </div>
                <div></div>
                <div className="view">
                  <Button variant="white" action="" icon="edit"></Button>
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
            ))
          )}
        </div>
      </div>
    </StyledUser>
  );
};

export default User;
