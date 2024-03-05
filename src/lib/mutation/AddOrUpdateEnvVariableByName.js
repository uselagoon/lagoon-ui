import gql from 'graphql-tag';

export default gql`
  mutation ($input: EnvVariableByNameInput!) {
    addOrUpdateEnvVariableByName(input: $input) {
      id
      name
      scope
      value
    }
  }
`;
