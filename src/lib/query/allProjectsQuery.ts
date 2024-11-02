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
      kubernetes {
        id
        name
        cloudRegion
      }
      environments(type: PRODUCTION) {
        route
        updated
      }
    }
  }
`;
