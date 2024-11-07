import { gql } from "@apollo/client";

export default gql`
  query deploymentsByFilter {
    deploymentsByFilter {
      id
      name
      status
      created
      buildStep
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