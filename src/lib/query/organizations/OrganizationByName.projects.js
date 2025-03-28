import gql from 'graphql-tag';

export default gql`
  query getOrganization($name: String!) {
    organization: organizationByName(name: $name) {
      id
      name
      friendlyName
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

export const OrgProjectsGroupCountQuery = gql`
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
