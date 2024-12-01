import { gql } from '@apollo/client';

export default gql`
  mutation removeUserFromGroup($email: String!, $groupId: String!) {
    removeUserFromGroup(input: { user: { email: $email }, group: { id: $groupId } }) {
      id
      name
    }
  }
`;
