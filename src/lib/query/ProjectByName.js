import gql from 'graphql-tag';

export default gql`
  query getProject($name: String!) {
    project: projectByName(name: $name) {
      id
      name
      organization
      organizationDetails {
        id
        name
        friendlyName
      }
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
