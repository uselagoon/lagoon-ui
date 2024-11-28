import { gql } from '@apollo/client';

export default gql`
  query getOrganization($name: String!) {
    organization: organizationByName(name: $name) {
      id
      name
      friendlyName
      groups {
        name
      }
    }
  }
`;
