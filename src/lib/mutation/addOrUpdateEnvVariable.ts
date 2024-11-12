import { gql } from '@apollo/client';

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
