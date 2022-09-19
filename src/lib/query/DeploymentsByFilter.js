import gql from 'graphql-tag';

export default gql`
    query deploymentsByFilter {
      deploymentsByFilter {
      id
      name
      status
      environment {
        name
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
