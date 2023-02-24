import gql from 'graphql-tag';

export default gql`
  query getEnvironment($openshiftProjectName: String!) {
    environment: environmentByOpenshiftProjectName(
      openshiftProjectName: $openshiftProjectName
    ) {
      id
      name
      created
      updated
      deployType
      environmentType
      routes
      openshiftProjectName
      envVariables {
        id
        name
        scope
        value
      }
      project {
        name
        gitUrl
        productionRoutes
        standbyRoutes
        productionEnvironment
        standbyProductionEnvironment
        problemsUi
        factsUi
        envVariables {
          id
          name
          scope
          value
        }
      }
    }
  }
`;
