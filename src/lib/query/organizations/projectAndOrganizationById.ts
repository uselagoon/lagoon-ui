import EmailFragment from '@/lib/fragment/email';
import RocketChatFragment from '@/lib/fragment/rocketChat';
import SlackFragment from '@/lib/fragment/slack';
import TeamsFragment from '@/lib/fragment/teams';
import WebhookFragment from '@/lib/fragment/webhook';
import { gql } from '@apollo/client';

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
        memberCount
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
