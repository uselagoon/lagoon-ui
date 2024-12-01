import { gql } from '@apollo/client';

export const UPDATE_NOTIFICATION_SLACK = gql`
  mutation UpdateNotificationSlack($name: String!, $patch: UpdateNotificationSlackPatchInput) {
    updateNotificationSlack(input: { name: $name, patch: $patch }) {
      name
    }
  }
`;
export const UPDATE_NOTIFICATION_ROCKETCHAT = gql`
  mutation UpdateNotificationRocketChat($name: String!, $patch: UpdateNotificationRocketChatPatchInput) {
    updateNotificationRocketChat(input: { name: $name, patch: $patch }) {
      name
    }
  }
`;
export const UPDATE_NOTIFICATION_EMAIL = gql`
  mutation UpdateNotificationEmail($name: String!, $patch: UpdateNotificationEmailPatchInput) {
    updateNotificationEmail(input: { name: $name, patch: $patch }) {
      name
    }
  }
`;

export const UPDATE_NOTIFICATION_WEBHOOK = gql`
  mutation UpdateNotificationWebhook($name: String!, $patch: UpdateNotificationWebhookPatchInput) {
    updateNotificationWebhook(input: { name: $name, patch: $patch }) {
      name
    }
  }
`;
export const UPDATE_NOTIFICATION_TEAMS = gql`
  mutation UpdateNotificationMicrosoftTeams($name: String!, $patch: UpdateNotificationMicrosoftTeamsPatchInput) {
    updateNotificationMicrosoftTeams(input: { name: $name, patch: $patch }) {
      name
    }
  }
`;
