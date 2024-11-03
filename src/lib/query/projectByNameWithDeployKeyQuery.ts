import { gql } from '@apollo/client';

export default gql`
  query getProject($name: String!) {
    project: projectByName(name: $name) {
      id
      name
      publicKey
    }
  }
`;
