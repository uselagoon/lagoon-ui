import gql from 'graphql-tag';

export default gql`
  query getOrganization($id: Int!){
    organization: organizationById (organization: $id){
      id
      name
      description
      quotaProject
      quotaGroup
      quotaNotification
      deployTargets{
        id
        name
        friendlyName
        cloudProvider
        cloudRegion
      }
      owners {
        email
        owner
      }
      projects {
        id
        name
        groups {
          type
          id
          name
        }
      }
      groups {
        id
        name
        type
        members {
          role
          user {
            email
            comment
          }
          role
        }
      }
    }
  }
`;
