import FactsFragment from '@/lib/fragment/fact';
import gql from 'graphql-tag';

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
