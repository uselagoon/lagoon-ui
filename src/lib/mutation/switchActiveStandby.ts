import { gql } from '@apollo/client';

export default gql`
  mutation switchActiveStandby($input: switchActiveStandbyInput!) {
    switchActiveStandby(input: $input) {
      id
      remoteId
    }
  }
`;
