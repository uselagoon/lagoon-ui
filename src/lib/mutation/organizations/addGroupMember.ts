import { gql } from '@apollo/client';

export default gql`
  mutation addUserToGroup($email: String!, $group: String!, $role: GroupRole!, $inviteUser: Boolean) {
    addUserToGroup(input: { user: { email: $email }, group: { name: $group }, role: $role, inviteUser: $inviteUser }) {
      name
    }
  }
`;
