import { gql } from '@apollo/client';

export default gql`
  mutation deleteEnvironment($input: DeleteEnvironmentInput!) {
    deleteEnvironment(input: $input)
  }
`;
