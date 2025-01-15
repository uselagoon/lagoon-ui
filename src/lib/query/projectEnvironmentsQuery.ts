import ProblemsFragment from '@/lib/fragment/problem';
import { gql } from '@apollo/client';

export default gql`
  query getProject($name: String!) {
    project: projectByName(name: $name) {
      id
      name
      productionEnvironment
      standbyProductionEnvironment
      productionRoutes
      standbyRoutes
      environments {
        id
        name
        deployType
        environmentType
        routes
        updated
        openshiftProjectName
        project {
          problemsUi
          factsUi
        }
        openshift {
          friendlyName
          cloudRegion
        }
        problems {
          ...problemFields
        }
      }
    }
  }
  ${ProblemsFragment}
`;
