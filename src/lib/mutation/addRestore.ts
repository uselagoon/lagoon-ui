import { gql } from '@apollo/client';

export default gql`
  mutation addRestore($input: AddRestoreInput!) {
    addRestore(input: $input) {
      id
    }
  }
`;
