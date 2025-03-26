import { gql } from '@apollo/client';

export default gql`
  query getOrganization($name: String!) {
    organization: organizationByName(name: $name) {
      id
      name
      projects {
        id
        name
      }
      deployTargets {
        id
        name
      }
    }
  }
`;

export const orgProjectGroupCount = gql`
  query getOrganization($name: String!) {
    organization: organizationByName(name: $name) {
      id
      projects {
        id
        groupCount
      }
    }
  }
`;
