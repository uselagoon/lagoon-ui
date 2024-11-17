import { gql } from '@apollo/client';

export default gql`
  mutation taskDrushSqlSync($sourceEnvironment: Int!, $destinationEnvironment: Int!) {
    taskDrushSqlSync(sourceEnvironment: $sourceEnvironment, destinationEnvironment: $destinationEnvironment) {
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
