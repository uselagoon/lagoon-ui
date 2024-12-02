import { gql } from '@apollo/client';

export default gql`
  mutation removeUserFromOrganization($organization: Int!, $email: String!) {
    removeUserFromOrganization(input: { user: { email: $email }, organization: $organization }) {
      id
    }
  }
`;
