import { gql } from '@apollo/client';

export default gql`
  mutation addNotificationToProject(
    $notificationType: NotificationType!
    $notificationName: String!
    $projectName: String!
  ) {
    addNotificationToProject(
      input: { notificationType: $notificationType, notificationName: $notificationName, project: $projectName }
    ) {
      id
    }
  }
`;
