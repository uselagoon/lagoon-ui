import gql from 'graphql-tag';

export default gql`
  mutation($input: DeleteEnvVariableByNameInput!) {
    deleteEnvVariableByName(input: $input)
  }
`;
