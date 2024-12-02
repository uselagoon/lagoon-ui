import { gql } from '@apollo/client';

export default gql`
  mutation removeNotificationFromProject(
    $notificationType: NotificationType!
    $notificationName: String!
    $projectName: String!
  ) {
    removeNotificationFromProject(
      input: { notificationType: $notificationType, notificationName: $notificationName, project: $projectName }
    ) {
      name
    }
  }
`;
