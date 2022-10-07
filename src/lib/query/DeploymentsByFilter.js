import gql from 'graphql-tag';

export default gql`
    query deploymentsByFilter {
      deploymentsByFilter {
        id
        name
        status
        created
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
