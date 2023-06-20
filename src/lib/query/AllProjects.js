import gql from 'graphql-tag';

export default gql`
    query AllProjectsQuery{
      allProjects {
        id
        name
        environments(type: PRODUCTION) {
          route
        }
      }
    }
`;
