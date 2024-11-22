import { gql } from '@apollo/client';

export default gql`
  query me {
    me {
      id
      firstName
      lastName
      email
      sshKeys {
        id
        name
        keyType
        keyValue
        created
        lastUsed
        keyFingerprint
      }
    }
  }
`;
