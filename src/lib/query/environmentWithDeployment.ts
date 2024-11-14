import { gql } from '@apollo/client';

export default gql`
  query getEnvironment($openshiftProjectName: String!, $deploymentName: String!) {
    environment: environmentByOpenshiftProjectName(openshiftProjectName: $openshiftProjectName) {
      openshiftProjectName
      project {
        name
        problemsUi
        factsUi
      }
      deployments(name: $deploymentName) {
        id
        name
        status
        created
        buildStep
        started
        completed
        buildLog
        bulkId
        priority
      }
    }
  }
`;
