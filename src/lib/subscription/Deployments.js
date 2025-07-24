import gql from 'graphql-tag';

export default gql`
  subscription subscribeToDeployments($environment: Int!) {
    deploymentChanged(environment: $environment) {
      id
      name
      status
      created
      started
      completed
      buildLog
      buildStep
      priority
      bulkId
      bulkName
      remoteId
      sourceType
      sourceUser
    }
  }
`;
