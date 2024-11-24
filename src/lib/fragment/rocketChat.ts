import { gql } from '@apollo/client';

export default gql`
  fragment RocketChat on NotificationRocketChat {
    webhook
    name
    channel
  }
`;
