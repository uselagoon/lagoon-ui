import gql from 'graphql-tag';

export default gql`
  query me {
    me {
      id
      firstName
      lastName
      email
      # groups {
      #   id
      #   name
      #   type
      # }
      sshKeys {
        id
        name,
        keyType,
        created,
        keyFingerprint
      }
    }
  }
`;
