import gql from 'graphql-tag';

export default gql`
  query usersByOrganization($id: Int!) {
    users: usersByOrganization(organization: $id) {
      id
      firstName
      lastName
      email
      groupRoles {
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
      friendlyName
      groups {
        id
        name
      }
      owners {
        id
        firstName
        lastName
        email
        owner
        admin
      }
    }
  }
`;

export const getOrganizationByName = gql`
  query getOrganization($name: String!) {
    organization: organizationByName(name: $name) {
      id
      name
      friendlyName
      groups {
        id
        name
      }
      owners {
        id
        firstName
        lastName
        email
        owner
        admin
      }
    }
  }
`;
