import { gql } from '@apollo/client';

export default gql`
  mutation AddUserToOrganization($email: String!, $organization: Int!, $owner: Boolean, $admin: Boolean) {
    addUserToOrganization(
      input: { user: { email: $email }, organization: $organization, owner: $owner, admin: $admin }
    ) {
      id
    }
  }
`;
