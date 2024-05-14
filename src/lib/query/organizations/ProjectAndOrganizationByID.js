import gql from 'graphql-tag';
import EmailFragment from 'lib/fragment/Email';
import RocketChatFragment from 'lib/fragment/RocketChat';
import SlackFragment from 'lib/fragment/Slack';
import TeamsFragment from 'lib/fragment/Teams';
import WebhookFragment from 'lib/fragment/Webhook';

export default gql`
  query getOrganization($project: String!, $id: Int!) {
    project: orgProjectByName(name: $project) {
      id
      name
      groups {
        type
        id
        name
        memberCount
      }
      notifications {
        name
        type
      }
    }

    organization: organizationById(id: $id) {
      id
      name
      friendlyName
      quotaGroup
      quotaNotification
      quotaEnvironment
      groups {
        type
        name
      }
      slacks: notifications(type: SLACK) {
        __typename
        ...Slack
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
  ${RocketChatFragment}
  ${EmailFragment}
  ${TeamsFragment}
  ${WebhookFragment}
`;
