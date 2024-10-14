import { gql } from '@apollo/client';

export default gql`
  query getProject($name: String!) {
    project: projectByName(name: $name) {
      id
      name
      branches
      pullrequests
      created
      gitUrl
      productionEnvironment
      standbyProductionEnvironment
      productionRoutes
      standbyRoutes
      developmentEnvironmentsLimit
      deployTargetConfigs {
        id
        branches
        pullrequests
        deployTarget {
          id
          name
          friendlyName
        }
      }
      envVariables {
        id
        name
        scope
        value
      }
      environments {
        id
        name
        deployType
        environmentType
        routes
        openshiftProjectName
        openshift {
          friendlyName
          cloudRegion
        }
      }
    }
  }
`;
