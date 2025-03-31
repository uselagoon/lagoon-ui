import gql from 'graphql-tag';

export default gql`
  query getOrg($name: String!) {
    organization: organizationByName(name: $name) {
      id
      name
      friendlyName
      envVariables {
        id
        name
        value
        scope
      }
    }
  }
`;
