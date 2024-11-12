import { gql } from '@apollo/client';

export default gql`
  mutation ($input: DeleteEnvVariableByNameInput!) {
    deleteEnvVariableByName(input: $input)
  }
`;
