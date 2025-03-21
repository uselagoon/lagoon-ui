import { gql } from '@apollo/client';

export default gql`
  query getOrg($name: String!) {
    organization: organizationByName(name: $name) {
      id
      name
      envVariables {
        id
        name
        value
        scope
      }
    }
  }
`;
