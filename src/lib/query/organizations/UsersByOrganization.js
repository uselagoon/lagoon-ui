import gql from 'graphql-tag';

export default gql`
  query usersByOrganization($id: Int!) {
    users: usersByOrganization(organization: $id) {
      id
      firstName
      lastName
      email
      groupRoles{
        id
        role
      }
    }
  }
`;

export const getOrganization = gql`
  query getOrganization($id: Int!) {
    organization: organizationById(id: $id) {
      id
      name
      groups{
        id
        name
      }
      owners {
        id
        firstName
        lastName
        email
        owner
      }
    }
  }
`;
