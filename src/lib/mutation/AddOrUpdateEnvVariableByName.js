import gql from 'graphql-tag';

export default gql`
  mutation addEnvVariable($input: EnvVariableByNameInput!) {
    addOrUpdateEnvVariableByName(input: $input) {
      id
      name
      scope
      value
    }
  }
`;
