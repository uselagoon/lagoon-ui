import { gql } from '@apollo/client';

export default gql`
  mutation invokeRegisteredTask(
    $environment: Int!
    $taskRegistration: Int!
    $argumentValues: [AdvancedTaskDefinitionArgumentValueInput]
  ) {
    invokeRegisteredTask(
      environment: $environment
      advancedTaskDefinition: $taskRegistration
      argumentValues: $argumentValues
    ) {
      id
      name
      status
      created
      started
      completed
      remoteId
      command
      service
    }
  }
`;
