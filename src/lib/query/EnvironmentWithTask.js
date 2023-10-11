import gql from 'graphql-tag';

export default gql`
  query getEnvironment($openshiftProjectName: String!, $taskName: String!) {
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
      tasks(taskName: $taskName) {
        id
        name
        taskName
        status
        created
        service
        logs
        adminOnlyView
        files {
          id
          filename
          download
        }
      }
    }
  }
`;
