import { gql } from '@apollo/client';

export const REMOVE_NOTIFICATION_SLACK = gql`
  mutation removeNotification($name: String!) {
    deleteNotificationSlack(input: { name: $name })
  }
`;

export const REMOVE_NOTIFICATION_ROCKETCHAT = gql`
  mutation removeNotification($name: String!) {
    deleteNotificationRocketChat(input: { name: $name })
  }
`;

export const REMOVE_NOTIFICATION_EMAIL = gql`
  mutation removeNotification($name: String!) {
    deleteNotificationEmail(input: { name: $name })
  }
`;

export const REMOVE_NOTIFICATION_TEAMS = gql`
  mutation removeNotification($name: String!) {
    deleteNotificationMicrosoftTeams(input: { name: $name })
  }
`;

export const REMOVE_NOTIFICATION_WEBHOOK = gql`
  mutation removeNotification($name: String!) {
    deleteNotificationWebhook(input: { name: $name })
  }
`;
