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
      groups {
        id
      }
      projects {
        id
      }
      deployTargets {
        id
        name
      }
    }
  }
`;
