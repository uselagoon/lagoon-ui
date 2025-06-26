import gql from 'graphql-tag';

export default gql`
  query getOrganization($name: String!) {
    organization: organizationByName(name: $name) {
      id
      name
      friendlyName
      slacks: notifications(type: SLACK) {
        __typename
        ...Slack
      }
      discords: notifications(type: DISCORD) {
        __typename
        ...Discord
      }
      rocketchats: notifications(type: ROCKETCHAT) {
        __typename
        ...RocketChat
      }
      teams: notifications(type: MICROSOFTTEAMS) {
        __typename
        ...Teams
      }
      webhook: notifications(type: WEBHOOK) {
        __typename
        ...Webhook
      }
      emails: notifications(type: EMAIL) {
        __typename
        ...Email
      }
    }
  }
  fragment Webhook on NotificationWebhook {
    webhook
    name
  }
  fragment Teams on NotificationMicrosoftTeams {
    webhook
    name
  }
  fragment Email on NotificationEmail {
    emailAddress
    name
  }
  fragment RocketChat on NotificationRocketChat {
    webhook
    name
    channel
  }
  fragment Slack on NotificationSlack {
    webhook
    name
    channel
  }
  fragment Discord on NotificationDiscord {
    webhook
    name
  }
`;
