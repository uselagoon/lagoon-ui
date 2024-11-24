import { gql } from '@apollo/client';

export default gql`
  fragment Webhook on NotificationWebhook {
    webhook
    name
  }
`;
