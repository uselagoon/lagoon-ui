import { gql } from '@apollo/client';

export default gql`
  fragment Teams on NotificationMicrosoftTeams {
    webhook
    name
  }
`;
