import gql from 'graphql-tag';
import FactsFragment from 'lib/fragment/Fact';

export default gql`
  query getEnvironment($openshiftProjectName: String!) {
    environment: environmentByOpenshiftProjectName(openshiftProjectName: $openshiftProjectName) {
      id
      facts {
        ...factFields
      }
    }
  }
  ${FactsFragment}
`;
