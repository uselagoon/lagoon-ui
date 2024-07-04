import gql from 'graphql-tag';

export default gql`
  mutation updateUserSSHPublicKey($input: UpdateUserSSHPublicKeyInput!) {
    updateUserSSHPublicKey(input: $input) {
      id
      name
      keyValue
    }
  }
`;
