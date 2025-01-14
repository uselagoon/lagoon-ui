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
      envVariables {
        id
        name
        scope
        value
      }
    }
  }
`;
