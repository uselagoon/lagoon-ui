import gql from 'graphql-tag';

export default gql`
  fragment Discord on NotificationDiscord {
    webhook
    name
  }
`;
