import gql from 'graphql-tag';

export default gql`
  mutation addEnvVariable($input: EnvVariableInput!) {
    addEnvVariable(input: $input) {
      id
    }
  }
`;