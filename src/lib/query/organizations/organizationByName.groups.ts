import { gql } from '@apollo/client';

export default gql`
  query getOrganization($name: String!) {
    organization: organizationByName(name: $name) {
      id
      groups {
        id
        name
        type
      }
    }
  }
`;

export const orgGroupMemberCount = gql`
  query getOrganization($name: String!) {
    organization: organizationByName(name: $name) {
      id
      groups {
        id
        memberCount
      }
    }
  }
`;
