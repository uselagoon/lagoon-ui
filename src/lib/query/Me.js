import gql from 'graphql-tag';

export default gql`
  query me {
    me {
      id
      firstName
      lastName
      email
      emailOptIn
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
