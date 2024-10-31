import FactsFragment from '@/lib/fragment/fact';
import { gql } from '@apollo/client';

export default gql`
  query getEnvironment($openshiftProjectName: String!) {
    environment: environmentByOpenshiftProjectName(openshiftProjectName: $openshiftProjectName) {
      id
      name
      openshiftProjectName
      project {
        id
        name
        problemsUi
        factsUi
      }
      insights {
        id
        file
        fileId
        service
        type
        size
        downloadUrl
        created
      }
      facts {
        ...factFields
      }
    }
  }
  ${FactsFragment}
`;
