import { gql } from '@apollo/client';

export default gql`
  mutation taskDrushCron($environment: Int!) {
    taskDrushCron(environment: $environment) {
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
