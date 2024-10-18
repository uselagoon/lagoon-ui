import { gql } from '@apollo/client';

export default gql`
  mutation addUserSSHPublicKey($input: AddUserSSHPublicKeyInput!) {
    addUserSSHPublicKey(input: $input) {
      id
      name
      keyValue
      created
    }
  }
`;
