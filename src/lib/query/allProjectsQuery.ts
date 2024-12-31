import { gql } from '@apollo/client';

export default gql`
  query AllProjectsQuery {
    allProjects {
      id
      name
      problemsUi
      factsUi
      created
      gitUrl
      productionEnvironment
      kubernetes {
        id
        name
        cloudRegion
      }
      environments {
        name
        route
        updated
      }
    }
  }
`;
