import gql from 'graphql-tag';

export default gql`
  query me {
    me {
      id
      firstName
      lastName
      email
      emailNotifications {
        sshKeyChanges
        groupRoleChanges
        organizationRoleChanges
      }
      sshKeys {
        id
        name
        keyType
        keyValue
        created
        keyFingerprint
        lastUsed
      }
    }
  }
`;
