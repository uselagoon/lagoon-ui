import { gql } from '@apollo/client';

export default gql`
  mutation deleteUserSSHPublicKey($input: DeleteUserSSHPublicKeyByIdInput!) {
    deleteUserSSHPublicKey(input: $input)
  }
`;
