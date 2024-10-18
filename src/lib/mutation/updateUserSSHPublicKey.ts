import { gql } from '@apollo/client';

export default gql`
  mutation updateUserSSHPublicKey($input: UpdateUserSSHPublicKeyInput!) {
    updateUserSSHPublicKey(input: $input) {
      id
      name
      keyValue
    }
  }
`;
