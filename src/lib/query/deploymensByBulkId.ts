import { gql } from '@apollo/client';

export default gql`
  query deploymentsByBulkId($bulkId: String!) {
    deploymentsByBulkId(bulkId: $bulkId) {
      id
      name
      status
      created
      buildStep
      started
      completed
      buildLog
      bulkId
      bulkName
      priority
      environment {
        name
        openshiftProjectName
        project {
          name
        }
      }
    }
  }
`;
