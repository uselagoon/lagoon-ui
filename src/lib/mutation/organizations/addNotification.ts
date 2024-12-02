import { gql } from '@apollo/client';

export const ADD_SLACK_NOTIFICATION = gql`
  mutation addNotificationSlack($organization: Int!, $name: String!, $channel: String!, $webhook: String!) {
    addNotificationSlack(input: { organization: $organization, name: $name, channel: $channel, webhook: $webhook }) {
      id
    }
  }
`;

export const ADD_ROCKETCHAT_NOTIFICATION = gql`
  mutation addNotificationRocketChat($organization: Int!, $name: String!, $channel: String!, $webhook: String!) {
    addNotificationRocketChat(
      input: { organization: $organization, name: $name, channel: $channel, webhook: $webhook }
    ) {
      id
    }
  }
`;

export const ADD_EMAIL_NOTIFICATION = gql`
  mutation addNotificationEmail($organization: Int!, $name: String!, $emailAddress: String!) {
    addNotificationEmail(input: { organization: $organization, name: $name, emailAddress: $emailAddress }) {
      id
    }
  }
`;
export const ADD_MICROSOFTTEAMS_NOTIFICATION = gql`
  mutation addNotificationMicrosoftTeams($organization: Int!, $name: String!, $webhook: String!) {
    addNotificationMicrosoftTeams(input: { organization: $organization, name: $name, webhook: $webhook }) {
      id
    }
  }
`;

export const ADD_WEBHOOK_NOTIFICATION = gql`
  mutation addNotificationWebhook($organization: Int!, $name: String!, $webhook: String!) {
    addNotificationWebhook(input: { organization: $organization, name: $name, webhook: $webhook }) {
      id
    }
  }
`;
