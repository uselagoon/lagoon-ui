import gql from 'graphql-tag';
import SlackFragment from 'lib/fragment/Slack';
import RocketChatFragment from 'lib/fragment/RocketChat';
import EmailFragment from 'lib/fragment/Email';
import TeamsFragment from 'lib/fragment/Teams';
import WebhookFragment from 'lib/fragment/Webhook';

export default gql`
  query getOrganization($id: Int!){
    organization: organizationById (organization: $id){
      id
      name
      description
      quotaProject
      quotaGroup
      quotaNotification
      deployTargets{
        id
        name
        friendlyName
        cloudProvider
        cloudRegion
      }
      owners {
        email
        owner
      }
      projects {
        id
        name
        groups {
          type
          id
          name
        }
      }
      groups {
        id
        name
        type
        members {
          role
          user {
            email
            comment
          }
          role
        }
      }
      slacks: notifications(type: SLACK){
        __typename
        ...Slack
      }
      rocketchats: notifications(type: ROCKETCHAT){
        __typename
        ...RocketChat
      }
      teams: notifications(type: MICROSOFTTEAMS){
        __typename
        ...Teams
      }
      webhook: notifications(type: WEBHOOK){
        __typename
        ...Webhook
      }
      emails: notifications(type: EMAIL){
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
