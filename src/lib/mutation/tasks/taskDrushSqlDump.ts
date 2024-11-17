import { gql } from '@apollo/client';

export default gql`
  mutation taskDrushSqlDump($environment: Int!) {
    taskDrushSqlDump(environment: $environment) {
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
