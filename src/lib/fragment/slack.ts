import { gql } from '@apollo/client';

export default gql`
  fragment Slack on NotificationSlack {
    webhook
    name
    channel
  }
`;
