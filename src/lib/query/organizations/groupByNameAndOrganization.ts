import { gql } from '@apollo/client';

export default gql`
  query getGroup($name: String!, $organization: Int!) {
    group: groupByNameAndOrganization(name: $name, organization: $organization) {
      id
      name
      type
      projects {
        id
        name
      }
      members {
        role
        user {
          firstName
          lastName
          email
          comment
        }
      }
    }

    organization: organizationById(id: $organization) {
      id
      name
      friendlyName
      description
      quotaProject
      quotaGroup
      quotaNotification
      quotaEnvironment
      deployTargets {
        id
        name
      }
      projects {
        id
        name
      }
    }
  }
`;
