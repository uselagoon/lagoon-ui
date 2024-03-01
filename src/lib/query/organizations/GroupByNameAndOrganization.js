import gql from 'graphql-tag';

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
