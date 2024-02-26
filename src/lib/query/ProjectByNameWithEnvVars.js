import gql from 'graphql-tag';

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
      openshiftProjectName
      envVariables {
        id
        name
        scope
      }
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
    }
  }
`;
