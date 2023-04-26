import gql from 'graphql-tag';

export default gql`
  query deploymentsByFilter {
    deploymentsByFilter {
      id
      name
      status
      created
      priority
      started
      completed
      environment {
        name
        openshiftProjectName
        openshift {
          id
          name
        }
        project {
          id
          name
        }
      }
    }
  }
`;
