import { gql } from '@apollo/client';

export default gql`
  {
    allOrganizations {
      id
      name
      description
      friendlyName
      quotaProject
      quotaGroup
      deployTargets {
        id
        name
      }
    }
  }
`;

export const orgGroupsAndProjectsQuery = gql`
  {
    allOrganizations {
      id
      groups {
        id
        type
      }
      projects {
        id
      }
    }
  }
`;
