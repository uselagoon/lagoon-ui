import gql from 'graphql-tag';

export default gql`
  mutation deleteEnvironment($input: DeleteEnvironmentInput!) {
    deleteEnvironment(input: $input)
  }
`;
