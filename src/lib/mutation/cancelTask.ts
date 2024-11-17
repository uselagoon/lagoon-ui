import { gql } from '@apollo/client';

export default gql`
  mutation cancelTask($taskName: String!, $taskId: Int!, $environmentId: Int!, $projectId: Int!) {
    cancelTask(
      input: {
        task: { id: $taskId, taskName: $taskName, environment: { id: $environmentId, project: { id: $projectId } } }
      }
    )
  }
`;
