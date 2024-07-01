import gql from 'graphql-tag';

export default gql`
  mutation deleteUserSSHPublicKey($input: DeleteUserSSHPublicKeyByIdInput!) {
    deleteUserSSHPublicKey(input: $input)
  }
`;
