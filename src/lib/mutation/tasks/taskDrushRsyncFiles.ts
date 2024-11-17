import { gql } from '@apollo/client';

export default gql`
  mutation taskDrushRsyncFiles($sourceEnvironment: Int!, $destinationEnvironment: Int!) {
    taskDrushRsyncFiles(sourceEnvironment: $sourceEnvironment, destinationEnvironment: $destinationEnvironment) {
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
