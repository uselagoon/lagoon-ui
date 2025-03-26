import gql from 'graphql-tag';

export default gql`
  query getOrganization($name: String!) {
    organization: organizationByName(name: $name) {
      id
      name
      groups {
        id
        name
        type
      }
    }
  }
`;

export const OrgGroupMemberCountQuery = gql`
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
