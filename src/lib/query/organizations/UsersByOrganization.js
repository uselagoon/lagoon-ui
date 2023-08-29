import gql from 'graphql-tag';

export default gql`
  # query usersByOrganization($id: Int!) {
  #   users: usersByOrganization (organization: $id){
  #     id
  #     firstName
  #     lastName
  #     email
  #     comment
  #     groupRoles {
  #       organization
  #     }
  #   }
  # }

  query getOrganization($id: Int!) {
    organization: organizationById(organization: $id) {
      id
      name
      owners {
        id
        firstName
        lastName
        email
        owner
      }
      projects {
        id
        name
      }
      groups {
        id
        name
        members {
          role
          user {
            id
            firstName
            lastName
            email
            comment
          }
          role
        }
      }
    }
  }
`;
