import gql from 'graphql-tag';

export default gql`
  mutation addUserSSHPublicKey($input: AddUserSSHPublicKeyInput!) {
    addUserSSHPublicKey(input: $input) {
      id
      name
      publicKey
      created
    }
  }
`;
