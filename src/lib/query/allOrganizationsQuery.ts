import { gql } from '@apollo/client';

export default gql`
  {
    allOrganizations {
      id
      name
      description
      friendlyName
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
