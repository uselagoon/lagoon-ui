import gql from 'graphql-tag';

export default gql`
  mutation addProject ($input: AddProjectInput!){
    addProject(input: $input) {
      id
      name
    }
  }
`;