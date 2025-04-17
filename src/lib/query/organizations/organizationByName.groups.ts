import { gql } from '@apollo/client';

export default gql`
  query getOrganization($name: String!) {
    organization: organizationByName(name: $name) {
      id
      name
      friendlyName
      groups {
        id
        name
        type
        memberCount @client
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
      }
    }
  }
`;

export const GET_SINGLE_GROUP = gql`
  query getGroup($name: String!, $organization: Int!) {
    group: groupByNameAndOrganization(name: $name, organization: $organization) {
      id
      memberCount
    }
  }
`;
