import gql from 'graphql-tag';
import EmailFragment from 'lib/fragment/Email';
import RocketChatFragment from 'lib/fragment/RocketChat';
import SlackFragment from 'lib/fragment/Slack';
import TeamsFragment from 'lib/fragment/Teams';
import WebhookFragment from 'lib/fragment/Webhook';

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
      }
      environments {
        id
      }
      groups {
        id
        name
        type
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
