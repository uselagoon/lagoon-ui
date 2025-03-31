import gql from 'graphql-tag';

export default gql`
  query getOrganization($name: String!) {
    organization: organizationByName(name: $name) {
      id
      name
      friendlyName
      owners {
        id
        firstName
        lastName
        email
        owner
        admin
        groupRoles {
          id
        }
      }
    }
  }
`;
