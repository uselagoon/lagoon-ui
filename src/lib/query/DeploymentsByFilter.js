import gql from 'graphql-tag';

export default gql`
    query deploymentsByFilter {
      deploymentsByFilter {
      id
      name
      status
      priority
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
