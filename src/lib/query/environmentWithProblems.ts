import { gql } from '@apollo/client';
import ProblemsFragment from '@/lib/fragment/problem';

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
      problems {
        ...problemFields
      }
    }
  }
  ${ProblemsFragment}
`;
