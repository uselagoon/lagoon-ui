import EmailFragment from '@/lib/fragment/email';
import RocketChatFragment from '@/lib/fragment/rocketChat';
import SlackFragment from '@/lib/fragment/slack';
import TeamsFragment from '@/lib/fragment/teams';
import WebhookFragment from '@/lib/fragment/webhook';
import { gql } from '@apollo/client';

export default gql`
  query getOrganization($name: String!) {
    organization: organizationByName(name: $name) {
      id
      name
      description
      quotaProject
      friendlyName
      quotaGroup
      quotaNotification
      quotaEnvironment
      deployTargets {
        id
        name
        friendlyName
        cloudProvider
        cloudRegion
      }
      owners {
        id
        firstName
        lastName
        email
        owner
        admin
      }
      projects {
        id
        name
        groupCount
      }
      environments {
        id
      }
      groups {
        id
        name
        type
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
