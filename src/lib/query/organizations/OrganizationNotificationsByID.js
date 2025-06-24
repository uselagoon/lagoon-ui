import gql from 'graphql-tag';
import EmailFragment from 'lib/fragment/Email';
import RocketChatFragment from 'lib/fragment/RocketChat';
import SlackFragment from 'lib/fragment/Slack';
import SlackFragment from 'lib/fragment/Discord';
import TeamsFragment from 'lib/fragment/Teams';
import WebhookFragment from 'lib/fragment/Webhook';

export default gql`
  query getNotifications($id: Int!) {
    organization: organizationById(id: $id) {
      id
      name
      friendlyName
      description
      quotaProject
      quotaGroup
      quotaNotification
      quotaEnvironment
      owners {
        email
      }
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
  ${SlackFragment}
  ${DiscordFragment}
  ${RocketChatFragment}
  ${EmailFragment}
  ${TeamsFragment}
  ${WebhookFragment}
`;
