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
        type
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
