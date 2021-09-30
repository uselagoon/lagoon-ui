import gql from 'graphql-tag';

export default gql`
  mutation addOrUpdateEnvironment($input: AddEnvironmentInput!){
    addOrUpdateEnvironment(input: $input) {
      id
      name
    }
  }
`;