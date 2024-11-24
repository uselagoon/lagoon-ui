import { gql } from '@apollo/client';

export default gql`
  fragment Email on NotificationEmail {
    emailAddress
    name
  }
`;
